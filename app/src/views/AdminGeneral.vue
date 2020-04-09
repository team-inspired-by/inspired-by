<template>
  <div>
    <custom-subheader title="General Settings" indent />
    <v-row>
      <v-col cols="12" sm="3" class="pr-0 pl-5">
        <v-list class="card-list fill-height" flat rounded>
          <v-list-item-group v-model="selectedGeneralSetting" mandatory>
            <v-list-item v-for="(item, i) in settingLists" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" sm="9" class="px-0">
        <v-card v-if="selectedGeneralSetting == 0" class="card-content fill-height" flat>
          <v-row>
            <v-col cols="12" sm="6">
              <v-list two-line subheader>
                <v-subheader>Topics</v-subheader>
                <v-list-item>
                  <v-list-item-content>
                    <div class="text-center">
                      <v-chip
                        class="ma-2"
                        color="grey lighten-2"
                        outlined
                        :key="key"
                        v-for="(topic, key) in topicList"
                      >
                        <v-icon left>
                          mdi-alpha-{{
                          topic["text"][0].toLowerCase()
                          }}
                        </v-icon>
                        {{ topic["text"] }}
                      </v-chip>
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" sm="6">
              <v-list two-line subheader>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>English</v-list-item-title>
                    <v-list-item-subtitle>Created at Dec 14, 2019</v-list-item-subtitle>
                    <v-list-item-subtitle>Updated at Dec 16, 2019</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Change Cover Image</v-list-item-title>
                    <v-list-item-subtitle>Current: default</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Change Background Image</v-list-item-title>
                    <v-list-item-subtitle>Current: default</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Set Icon</v-list-item-title>
                    <v-list-item-subtitle>Current: default</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Change name</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Change description</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
        <v-card v-if="selectedGeneralSetting == 1" class="fill-height py-1 px-5">
          <v-row>
            <v-col cols="12">
              <v-data-table :headers="postHeaders" :items="postdata" :items-per-page="5"></v-data-table>
            </v-col>
          </v-row>
          <v-list subheader two-line flat>
            <v-subheader>Posts</v-subheader>
            <v-list-item-group v-model="postSettings" multiple>
              <v-list-item>
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Notifications</v-list-item-title>
                    <v-list-item-subtitle>Allow notifications</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Sound</v-list-item-title>
                    <v-list-item-subtitle>Hangouts message</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Video sounds</v-list-item-title>
                    <v-list-item-subtitle>Hangouts video call</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>

              <v-list-item>
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-action>
                    <v-checkbox v-model="active" color="primary" @click="toggle"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>Invites</v-list-item-title>
                    <v-list-item-subtitle>Notify when receiving invites</v-list-item-subtitle>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "AdminGeneral",
  data: () => ({
    selectedGeneralSetting: 1,
    settingLists: [
      {
        icon: "mdi-inbox-full-outline",
        text: "Topics"
      },
      {
        icon: "mdi-file-document-outline",
        text: "Posts"
      },
      {
        icon: "mdi-file-chart-outline",
        text: "Projects"
      },
      {
        icon: "mdi-account-circle-outline",
        text: "Users"
      },
      {
        icon: "mdi-file-cabinet",
        text: "File manager"
      }
    ],
  }),
  computed: {
    topicList () {
      return this.$store.getters.getTopicList;
    }
  }
};
</script>
