<template>
  <div>
    <custom-subheader title="User Management" indent />
    <v-row id="config-box" ref="config-box" @click="focus()">
      <v-col cols="12" sm="3" class="pr-0 pl-5">
        <v-list class="card-list fill-height" flat rounded>
          <v-list-item-group v-model="selectedGeneralSetting" mandatory>
            <v-list-item :class="{'active': !selectedLevel}" @click="selectedLevel = ''">
              <v-list-item-icon>
                <v-icon v-text="'mdi-account-circle-outline'"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="'All Users'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              v-for="(item, i) in listLevels"
              :key="i"
              :class="{'active': selectedLevel == item.val}"
              @click="selectedLevel = item.val"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text+'s'"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" md="9" class="px-0">
        <v-card class="card-content fill-height mt-0" flat>
          <v-row class="mx-0">
            <v-col cols="12" sm="6">
              <v-subheader>Members</v-subheader>
              <v-list class="col-list" two-line subheader>
                <v-card
                  :id="'user-'+key"
                  class="user-card ma-2"
                  :class="{'active': (val['id'] == selectedUser['id'
                  ])}"
                  @click="selectUser(val)"
                  :key="key"
                  v-for="val, key in filteredData"
                  flat
                >
                  <a :v-scroll-to="'#user-card-'+key">
                    <v-row class="mx-0">
                      <v-col cols="12" sm="3" class="ma-auto px-0 text-center">
                        <v-avatar>
                          <v-icon>mdi-account-circle</v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col cols="9">
                        <h3>{{val.name}}</h3>
                        <li>{{val.level}}</li>
                        <li>{{val.email}}</li>
                      </v-col>
                    </v-row>
                  </a>
                </v-card>
              </v-list>
            </v-col>
            <v-col cols="12" sm="6" class="pl-0" v-if="selectedUser['id']">
              <v-subheader>Member Detail</v-subheader>
              <v-form ref="selectedUser" class="user-form" v-model="valid" :lazy-validation="lazy">
                <v-row class="mx-0 text-center">
                  <v-col cols="12" sm="4" class="pt-2 pb-0">
                    <v-avatar class="pt-5">
                      <v-icon>mdi-account-circle</v-icon>
                    </v-avatar>
                  </v-col>
                  <v-col cols="12" sm="8" class="pb-0">
                    <v-text-field v-model="selectedUser['name']" label="username" filled />
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      v-model="selectedUser['alias']"
                      label="alias"
                      class="px-0 mx-0"
                      filled
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="4">
                    <v-text-field
                      v-model="selectedUser['initialLetter']"
                      label="initial letter"
                      class="px-0 mx-0"
                      filled
                      hide-details
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="selectedUser['level']"
                      :items="listLevels"
                      item-text="text"
                      item-value="val"
                      filled
                      hide-details
                      label="level"
                      dense
                    />
                    <v-switch
                      v-model="selectedUser['isHeavyUser']"
                      class="mx-3"
                      hide-details
                      flat
                      color="white"
                      label="Deselect if performance is low"
                    />
                    <v-switch
                      v-model="selectedUser['isStashed']"
                      class="mx-3"
                      hide-details
                      flat
                      color="red darken-3"
                      label="Ban user"
                    />
                    <v-subheader class="text-left">
                      Created in {{new Date(selectedUser['createdAt']).toDateString()}}
                      <br />
                    </v-subheader>
                    <v-subheader class="overflow-x-auto text-left">User id: {{selectedUser['id']}}</v-subheader>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AdminUser",
  data: () => ({
    valid: true,
    lazy: false,
    selectedGeneralSetting: 1,
    listLevels: [
      {
        icon: "mdi-account-circle-outline",
        text: "Manager",
        val: 'MANAGER'
      },
      {
        icon: "mdi-account-circle-outline",
        text: "Writer",
        val: "WRITER"
      },
      {
        icon: "mdi-account-circle-outline",
        text: "Member",
        val: "MEMBER"
      },
      {
        icon: "mdi-account-circle-outline",
        text: "Visitor",
        val: "VISITOR"
      },
    ],
    userData: [],
    selectedLevel: '',
    selectedUser: {},
  }),
  mounted () {
    setTimeout(() => {
      this.userData = this.$store.getters.getSampleUsers;
    }, 1300);
  },
  computed: {
    topicLists () {
      return this.$store.getters.getTopicLists;
    },
    filteredData () {
      return this.userData.filter(user => this.selectedLevel == user['level'] || this.selectedLevel == '')
    }
  },
  methods: {
    focus () {
      this.$scrollTo(document.getElementById('config-box'), 1000, {
        offset: 100,
      })
    },
    selectUser (user) {
      this.selectedUser = user
    },
  }
};
</script>

<style lang="scss" scoped>
@keyframes test {
  from {
    background: transparent;
    // opacity: 0;
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  to {
    border: 1px solid transparent;
    border-color: transparent;
    background: rgba(255, 255, 255, 0.05);
    // opacity: 1;
  }
}
#config-box {
  .col-list {
    height: calc(100vh - 11em);
    overflow: auto;
    .user-card {
      border: 1px solid transparent;
      border-radius: 1em !important;
      background: rgba(255, 255, 255, 0.05);
      font-size: smaller;
      transition: background 0.5s, color 0.5s;
      h3 {
        color: white;
      }
      li {
        list-style: none;
        color: #aaa;
      }
      &:not(.active) {
        animation-name: test;
        animation-duration: 1s;
        animation-timing-function: ease-in;
        //   animation-fill-mode: forwards;
      }
      &.active {
        background: rgba(255, 255, 255, 0.7) !important;
        .v-icon {
          color: black;
        }
        h3 {
          color: black;
        }
        li {
          color: rgba(50, 50, 50, 1);
        }
      }
    }
  }
}
</style>