<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="users"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Members</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Member</v-btn>
              </template>
              <v-form
                ref="form"
                v-model="valid"
              >
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field ref="email" v-model="editedItem.email"
                          required
                          :rules="[ v => !!v || 'This field is required']"
                          label="Member ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="userType" v-model="editedItem.userType"
                          required
                          :items="userTypes"
                          placeholder="(A)dmin/(C)oach/(R)unner"
                          :rules="[ v => !!v || 'This field is required']"
                          label="User Type"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                         <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.membershipExprireDate"
                              required
                              :rules="[ v => !!v || 'This field is required']"
                              label="Exprire Date"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            ref="picker"
                            v-model="editedItem.membershipExprireDate"
                            max="2030-01-01"
                            min="2018-01-01"
                            @change="save_date"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="RunnerId"
                          v-model="editedItem.RunnerId"
                          :items="validRunners"
                          placeholder="Select..."
                          item-value="id"
                          item-text="name"
                          label="Linked Runner"
                          clearable
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="status"
                          v-model="editedItem.status"
                          :items="statuses"
                          required
                          :rules="[ v => !!v || 'This field is required']"
                          placeholder="(A)ctive/(I)nactive"
                          label="Status"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field ref="comment" v-model="editedItem.comment" label="Comment"></v-text-field>
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
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import UsersService from '@/services/UsersService'
import RunnersService from '@/services/RunnersService'

export default {
  data () {
    return {
      headers: [
        { text: 'ID', value: 'email' },
        { text: 'User Type', value: 'userType' },
        { text: 'Expire Date', value: 'membershipExprireDate' },
        { text: 'Status', value: 'status' },
        { text: 'Runner Name', value: 'Runner.name' },
        { text: 'Comment', value: 'comment' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      validRunners: [],
      users: [],
      userTypes: ['A', 'C', 'R'],
      statuses: ['A', 'I'],
      dialog: false,
      editedIndex: -1,
      menu: false,
      editedItem: {
        email: '',
        userType: '',
        membershipExprireDate: '',
        status: '',
        comment: ''
      },
      defaultItem: {
        email: '',
        userType: '',
        membershipExprireDate: '',
        status: '',
        comment: ''
      },
      valid: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Member' : 'Edit Member'
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.users = (await UsersService.index(value)).data
      }
    }
  },
  methods: {
    save_date (date) {
      this.$refs.menu.save(date)
    },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async deleteItem (item) {
      const index = this.users.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        // TODO call backend
        await UsersService.delete(item.id)
        this.users.splice(index, 1)
        console.log('deleted item spliced.....')
      }
    },

    close () {
      console.log('close method clicked.......')
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    async save () {
      console.log(this.editedItem)
      this.$refs.form.validate()
      if (this.valid) {
        try {
          console.log(this.editedItem)
          await UsersService.post(this.editedItem)
          this.$refs.form.reset()
        } catch (err) {
          alert(err.response.data.error)
          return
        }
        if (this.editedIndex && this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedItem)
        } else {
          this.users.push(this.editedItem)
        }
        console.log(10)
        this.close()
      }
    }
  },
  async mounted () {
    try {
      this.validRunners = (await RunnersService.index(null, 'ALL')).data
    } catch (err) {
      console.log(err)
    }
  }
}
</script>

<style scoped>
</style>
