<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="payments"
        sort-by="name"
        group-by="stripePi"
        group-name="aaaaa"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Payments</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <v-form
                ref="form"
                autocomplete="off">
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <p class="text-h6 text-left">Change Fulfill Successful to Yes, NO, or AUTO.</p>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Total Amount" readonly v-model="editedItem.amount" ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Item Name" readonly v-model="editedItem.itemName" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Quantity" readonly v-model="editedItem.itemQty" ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Unit Price" readonly v-model="editedItem.itemPrice" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Charge Successful" readonly v-model="editedItem.chargeSuccessful" ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Payment ID" readonly v-model="editedItem.stripePi" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field label="Comment" readonly v-model="editedItem.comment" ></v-text-field>
                        </v-col>
                         <v-col cols="12" sm="6" md="4">
                          <v-text-field label="User Name" readonly v-model="editedItem.userName" ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-autocomplete ref="fulfillSuccessful" v-model="editedItem.fulfillSuccessful"
                            :items="yesNo"
                            outlined
                            placeholder="Select..."
                            :rules="[ v => !!v || 'This field is required']"
                            label="Fulfill Successful"
                          ></v-autocomplete>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-card>
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on" small color="blue" class="mr-2" @click="editItem(item)">mdi-magnify</v-icon>
            </template>
            <span>Edit Payment</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                v-if="$store.state.user && ($store.state.user.userType == 'A')"
                small class="mr-2" color="red" @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <span>Delete Payment</span>
          </v-tooltip>
        </template>
        <template v-slot:[`item.createdAt`]="{ item }">
          <span>{{ new Date(item.createdAt).toLocaleString() }}</span>
        </template>
        <template v-slot:[`item.amount`]="{ item }">
          <span>{{ item.amount }}$</span>
        </template>
        <template v-slot:[`group.header`]="{items, isOpen, toggle}">
          <th colspan="7">
            <v-icon @click="toggle"
              >{{ isOpen ? 'mdi-minus' : 'mdi-plus' }}
            </v-icon>
            Paymnent ID: {{ items[0].stripePi }}, Paymnent Successful: {{ items[0].chargeSuccessful }}
          </th>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import PaymentService from '@/services/PaymentService'

export default {
  data () {
    return {
      headers: [
        { text: 'User ID', value: 'userName' },
        { text: 'Amount', value: 'amount' },
        { text: 'Time', value: 'createdAt' },
        { text: 'Item Name', value: 'itemName' },
        // { text: 'itemQty', value: 'itemQty' },
        // { text: 'itemPrice', value: 'itemPrice' },
        // { text: 'Charge Successful', value: 'chargeSuccessful', sortable: false },
        { text: 'Fulfill Successful', value: 'fulfillSuccessful' },
        { text: 'Payment ID', value: 'stripePi' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      payments: [],
      yesNo: ['Y', 'N', 'AUTO'],
      dialog: false,
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {}
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Payment' : 'Edit Payment'
    },
    paymentFilter: function () {
      if (this.$store.state.isUserLoggedIn) {
        if (this.$store.state.user.userType === 'A') {
          return 'ALL'
        } else {
          return this.$store.state.user.id
        }
      }
      return null
    }
  },
  watch: {
    date_menu (val) {
      val && setTimeout(() => (this.$refs.date_picker.activePicker = 'YEAR'))
    },
    dialog (val) {
      val || this.close()
    },
    '$route.query': {
      immediate: true,
      async handler (value) {
        // console.log('quqerying:', value)
        // console.log('paymentFilter:', this.paymentFilter)
        this.payments = (await PaymentService.index(value, this.paymentFilter)).data
        // console.log('returned:', this.payments)
      }
    }
  },
  methods: {
    editItem (item) {
      this.editedIndex = this.payments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      // console.log('editing:', this.editedItem.userName)
      this.dialog = true
    },
    async deleteItem (item) {
      const index = this.payments.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        await PaymentService.delete(item.id)
        this.payments.splice(index, 1)
      }
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      alert('entering save')
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        await PaymentService.post(this.editedItem)
      } catch (err) {
        console.log(err)
        alert(err)
        return
      }

      if (this.editedIndex > -1) {
        Object.assign(this.payments[this.editedIndex], this.editedItem)
      } else {
        this.payments.push(this.editedItem)
      }
      this.close()
    }
  },
  async mounted () {
  }
}
</script>
