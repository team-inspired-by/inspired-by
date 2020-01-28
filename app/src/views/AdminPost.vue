<template>
  <div id="page-box">
    <v-container id="contents-box" class="pt-0">
      <custom-appbar id="app-bar" :topic="topic" />
      <v-row id="head-banner">
        <v-col cols="12" class="px-0">
          <div class="border-box">
            <v-carousel class="mb-5" :show-arrows="false" hide-delimiters :height="carouselHeight">
              <!-- <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item> -->
              <v-carousel-item>
                <v-row class="overflow-hidden" :height="isCarouselOpen ? 0 : carouselHeight">
                  <v-col cols="12" sm="8" class="px-5 serif">
                    <div class="d-inline-block float-left" style="width: 6em; height: 100%;"></div>
                    <div>
                      <h1 class="align-self-end font-weight-medium">We inspires people</h1>
                      <p>See all the information here</p>
                      <p>
                        <v-btn class="my-0 mr-2" outlined color="white">Statistics</v-btn>
                        <v-btn class="my-0 mr-2" outlined color="white">Contents Editor</v-btn>
                        <v-btn class="my-0" outlined color="white">General Settings</v-btn>
                      </p>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="4"></v-col>
                </v-row>
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
      </v-row>
      <custom-subheader title="Highlights" />
      <v-row class="left-edge">
        <v-col cols="12" sm="4">
          <v-card class="mx-4 text-center" color="green" dark max-width="600">
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="hightlightVisited"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">{{ item.value }}</template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
            <v-card-text>
              <div class="display-1 font-weight-thin">Visited Last 24h</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn block text>Go to Report</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mx-4 text-center" dark max-width="600">
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="hightlightComments"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">{{ item.value }}</template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
            <v-card-text>
              <div class="display-1 font-weight-thin">Comments Last 24h</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn block text>Go to Report</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12" sm="4">
          <v-card class="mx-4 text-center" color="indigo" dark max-width="600">
            <v-card-text>
              <v-sheet color="rgba(0, 0, 0, .12)">
                <v-sparkline
                  :value="hightlightPosted"
                  color="rgba(255, 255, 255, .7)"
                  height="100"
                  padding="24"
                  stroke-linecap="round"
                  smooth
                >
                  <template v-slot:label="item">{{ item.value }}</template>
                </v-sparkline>
              </v-sheet>
            </v-card-text>
            <v-card-text>
              <div class="display-1 font-weight-thin">Posted Last 24h</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <v-btn block text>Go to Report</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <custom-subheader title="Schedule" reversed />
      <v-row class="right-edge fill-height" cols="12">
        <v-col>
          <v-sheet height="64" class="mx-4">
            <v-toolbar flat color="transparent">
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>mdi-chevron-right</v-icon>
              </v-btn>
              <v-toolbar-title>{{ title }}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-menu bottom right>
                <template v-slot:activator="{ on }">
                  <v-btn outlined color="grey darken-2" v-on="on">
                    <span>{{ typeToLabel[scheduleType] }}</span>
                    <v-icon right>mdi-menu-down</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="scheduleType = 'day'">
                    <v-list-item-title>Day</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="scheduleType = 'week'">
                    <v-list-item-title>Week</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="scheduleType = 'month'">
                    <v-list-item-title>Month</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="scheduleType = '4day'">
                    <v-list-item-title>4 days</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600" class="mx-4">
            <v-calendar
              ref="calendar"
              v-model="scheduleFocus"
              color="green"
              :events="events"
              :event-color="getEventColor"
              :now="today"
              :type="scheduleType"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
      <custom-subheader title="General Settings" indent />
      <v-row>
        <v-col cols="12" sm="3">
          <v-list flat rounded class="fill-height">
            <v-list-item-group v-model="selectedSetting" mandatory>
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
        <v-col cols="12" sm="9">
          <v-card v-if="selectedSetting == 0" class="py-1 px-5">
            <v-row>
              <v-col cols="12" sm="6">
                <v-list two-line subheader class="fill-height">
                  <sub-header>Topics</sub-header>
                  <v-list-item>
                    <v-list-item-content>
                      <div class="text-center">
                        <v-chip
                          class="ma-2"
                          color="grey lighten-2"
                          outlined
                          :key="key"
                          v-for="(topic, key) in listTopics"
                        >
                          <v-icon left>mdi-alpha-{{topic[0].toLowerCase()}}</v-icon>
                          {{topic}}
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
          <v-card v-if="selectedSetting == 1" class="fill-height py-1 px-5">
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
      <custom-subheader title="History" reversed indent />

      <v-row>
        <v-col cols="12">
          <v-timeline>
            <v-timeline-item>timeline item</v-timeline-item>
            <v-timeline-item class="text-right">timeline item</v-timeline-item>
            <v-timeline-item>timeline item</v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AdminPost",
  data: () => ({
    carouselHeight: 150,
    selectedSetting: 1,
    listTopics: ['English', 'Philosophy', 'ROS', 'Indonesian', 'Memory'],
    hightlightVisited: [
      1234,
      1230,
      1340,
      1620,
      2000,
      1900,
      812,
    ],
    hightlightComments: [
      423,
      446,
      675,
      510,
      590,
      610,
      760,
    ],
    hightlightPosted: [
      423,
      346,
      175,
      610,
      890,
      610,
      1060,
    ],
    settingLists: [
      {
        icon: 'mdi-inbox-full-outline',
        text: 'Topics',
      },
      {
        icon: 'mdi-file-document-outline',
        text: 'Posts',
      },
      {
        icon: 'mdi-file-chart-outline',
        text: 'Projects',
      },
      {
        icon: 'mdi-account-circle-outline',
        text: 'Users'
      },
      {
        icon: 'mdi-file-cabinet',
        text: 'File manager'
      }
    ],

    scheduleFocus: '',
    scheduleType: 'month',
    scheduleTypeToLabel: {
      month: 'Month',
      week: 'Week',
      day: 'Day',
      '4day': '4 Days',
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  computed: {
    title () {
      const { start, end } = this
      if (!start || !end) {
        return ''
      }

      const startMonth = this.monthFormatter(start)
      const endMonth = this.monthFormatter(end)
      const suffixMonth = startMonth === endMonth ? '' : endMonth

      const startYear = start.year
      const endYear = end.year
      const suffixYear = startYear === endYear ? '' : endYear

      const startDay = start.day + this.nth(start.day)
      const endDay = end.day + this.nth(end.day)

      switch (this.scheduleType) {
        case 'month':
          return `${startMonth} ${startYear}`
        case 'week':
        case '4day':
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`
        case 'day':
          return `${startMonth} ${startDay} ${startYear}`
      }
      return ''
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: 'UTC', month: 'long',
      })
    },
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    viewDay ({ date }) {
      this.scheduleFocus = date
      this.scheduleType = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.scheduleFocus = this.today
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)],
        })
      }

      this.start = start
      this.end = end
      this.events = events
    },
    nth (d) {
      return d > 3 && d < 21
        ? 'th'
        : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
    formatDate (a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
    },
  },
}
</script>

<style lang="scss" scoped>
#page-box {
  // transform: translateY(-50vh);
  #contents-box {
    .serif {
      font-family: "Times New Roman", Times, serif !important;
    }
    & > .row:first-child {
      padding-top: 150px;
    }
    #head-banner {
      .col {
        padding-top: 0;
        padding-bottom: 0;
        .border-box {
          border-right: 2px solid rgba(255, 255, 255, 0.12);
          padding: 10em 0 1em 0;
          .v-carousel {
            img {
              position: absolute;
              top: -4em;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
.v-calendar-weekly__day {
  border-right: transparent;
  border-color: rgba(255, 255, 255, 0.12) !important;
}
</style>
