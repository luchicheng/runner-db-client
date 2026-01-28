<template>
    <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="emails"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white" class="responsive-toolbar">
            <div class="d-flex flex-column flex-sm-row align-start w-100">
              <v-toolbar-title>Email Requests</v-toolbar-title>
              <v-divider
                class="mx-4 d-none d-sm-flex"
                inset
                vertical
              ></v-divider>
              <v-spacer class="d-none d-sm-flex"></v-spacer>
              <v-row class="ma-0 flex-grow-1" dense no-gutters>
              <v-col cols="12" sm="4" class="px-2 mb-2">
                <TooltipButton
                  text="Fetch the latest email requests"
                  color="primary"
                  dark
                  class="w-100"
                  @click="fetchEmailRequests"
                >
                  Fetch Requests
                </TooltipButton>
              </v-col>

              <v-col cols="12" sm="4" class="px-2 mb-2">
                <TooltipButton
                  text="Start the email sending job"
                  color="primary"
                  class="w-100"
                  @click="startEmailJob"
                >
                  Start Sending Job
                </TooltipButton>
              </v-col>

              <v-col cols="12" sm="4" class="px-2 mb-2">
                <TooltipButton
                  text="Stop the email sending job"
                  color="red"
                  class="w-100"
                  @click="stopEmailJob"
                >
                  Stop Sending Job
                </TooltipButton>
              </v-col>
            </v-row>
            </div>
            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
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
                      <v-col cols="12" sm="6" md="4" v-if="editedIndex !== -1">
                        <v-text-field ref="id" v-model="editedItem.id"
                          readonly
                          label="EmailRequest ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-autocomplete ref="status" v-model="editedItem.status"
                          required
                          :items="statusTypes"
                          placeholder="pending/sent/failed/cancelled"
                          :rules="[ v => !!v || 'This field is required']"
                          label="Status"
                        ></v-autocomplete>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field readonly ref="emailToAddress" v-model="editedItem.emailToAddress" label="Email To Address"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field readonly ref="sentDate" v-model="editedItem.sentDate" label="Sent Date"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field readonly ref="createdAt" v-model="editedItem.createdAt" label="Generated Date"></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field readonly ref="emailId" v-model="editedItem.EmailId" label="Email ID"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field readonly ref="subject" v-model="editedItem.subject" label="Email Subject"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea readonly ref="Email Html" v-model="editedItem.html" label="Email Html"></v-textarea>
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
        <template v-slot:[`item.Email.subject`]="{ item }">
          <div class="subject-cell">{{ (item.Email && item.Email.subject) || '' }}</div>
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
import EmailsService from '@/services/EmailsService'
import TooltipButton from './TooltipButton'

export default {
  components: {
    TooltipButton
  },
  data () {
    return {
      headers: [
        { text: 'Request ID', value: 'id' },
        { text: 'Recepient', value: 'emailToAddress' },
        { text: 'Status', value: 'status' },
        { text: 'Sent Date', value: 'sentDate' },
        { text: 'Generated Date', value: 'createdAt' },
        { text: 'Subject', value: 'Email.subject' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      validRunners: [],
      emails: [],
      statusTypes: ['pending', 'sent', 'failed', 'canceled'],
      dialog: false,
      editedIndex: -1,
      editedItem: {
      },
      defaultItem: {
      },
      valid: false
    }
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Email' : 'Edit Email Request'
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.emails = (await EmailsService.index(value, this.$route.query.statusFilter)).data
      }
    },
    '$route.query.statusFilter': {
      immediate: true,
      async handler (value) {
        this.emails = (await EmailsService.index(this.$route.query.search, value)).data
      }
    }
  },
  methods: {
    openNewEmailRequestDialog () {
      this.editedIndex = -1
      this.editedItem = {}
      this.valid = false
      this.dialog = true
      this.$nextTick(() => {
        if (this.$refs.form) {
          this.$refs.form.reset()
        }
      })
    },
    editItem (item) {
      this.editedIndex = this.emails.indexOf(item)
      // console.log('editing:', JSON.stringify(item))
      this.editedItem = Object.assign({}, item)
      // If Email is missing, flatten subject + html directly
      if (!item.Email) {
        this.$set(this.editedItem, 'subject', '')
        this.$set(this.editedItem, 'html', '')
      } else {
        // If Email exists, copy its fields to top-level
        this.$set(this.editedItem, 'subject', item.Email.subject || '')
        this.$set(this.editedItem, 'html', item.Email.html || '')
      }

      this.dialog = true
      // console.log('editing22222:', JSON.stringify(this.editedItem))
    },

    async deleteItem (item) {
      const index = this.emails.indexOf(item)
      if (confirm('Are you sure you want to delete this email sending request? ')) {
        // TODO call backend
        await EmailsService.delete(item.id)
        this.emails.splice(index, 1)
        // alert('Deleted email request with id:', item.id)
      }
    },
    async fetchEmailRequests () {
      if (confirm('Are you sure you want to fetch email requests? ')) {
        // TODO call backend
        await EmailsService.fetchEmailRequests()
          .then(response => {
            if (response.data.ok) {
              // Backend success
              const queued = response.data.queued
              const isEmptyQueued = (
                queued == null ||
                (Array.isArray(queued) && queued.length === 0) ||
                (queued && typeof queued === 'object' && Object.keys(queued).length === 0)
              )

              if (isEmptyQueued) {
                alert('No email request was fetched.')
              } else {
                alert(`Fetched ${response.data.queued.recipients} email requests for email id ${response.data.queued.emailId}`)
              }
            } else {
              // Backend returned ok: false
              alert(response.data.error || 'Unknown error')
            }
          })
          .catch(err => {
            // Network error, 500 error, timeout, etc.
            const msg =
          (err.response && err.response.data && err.response.data.error) ||
          err.message ||
          'Unexpected error occurred'

            alert(msg)
          })
      }
    },
    async startEmailJob () {
      if (confirm('Are you sure you want to start Email Sending Job? ')) {
        // TODO call backend
        await EmailsService.startEmailJob()
          .then(response => {
            if (response.data.ok) {
              // Backend success
              alert(response.data.message)
            } else {
              // Backend returned ok: false
              alert(response.data.error || 'Unknown error')
            }
          })
          .catch(err => {
            // Network error, 500 error, timeout, etc.
            const msg =
          (err.response && err.response.data && err.response.data.error) ||
          err.message ||
          'Unexpected error occurred'

            alert(msg)
          })
      }
    },

    async stopEmailJob () {
      if (confirm('Are you sure you want to stop Email Sending Job? ')) {
        // TODO call backend
        await EmailsService.stopEmailJob()
          .then(response => {
            if (response.data.ok) {
              // Backend success
              alert(response.data.message)
            } else {
              // Backend returned ok: false
              alert(response.data.error || 'Unknown error')
            }
          })
          .catch(err => {
            // Network error, 500 error, timeout, etc.
            const msg =
          (err.response && err.response.data && err.response.data.error) ||
          err.message ||
          'Unexpected error occurred'

            alert(msg)
          })
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
      this.$refs.form.validate()
      if (this.valid) {
        try {
          const response = await EmailsService.post(this.editedItem)
          // this.$refs.form.reset()
          if (this.editedIndex > -1) {
            Object.assign(this.emails[this.editedIndex], response.data)
          } else {
            this.emails.push(response.data)
          }
        } catch (err) {
          alert(err.response.data.error)
          return
        }
        this.close()
      }
    }
  },
  async mounted () {
  }
}
</script>

<style scoped>
.responsive-toolbar {
  height: auto !important;
  min-height: 64px;
}

@media (max-width: 599px) {
  .responsive-toolbar {
    min-height: 200px;
  }
}
</style>

<style>
.responsive-toolbar .v-toolbar__content {
  height: 100% !important;
  align-items: flex-start !important;
}
</style>
