<template>
  <div>
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
    <!-- <custom-subheader title="History" indent /> -->
    <custom-subheader title="Database Viewer" indent />
    <v-row id="config-box" ref="config-box" class="mt-2 indent" @click="focus()">
      <v-col cols="12" sm="3" id="col-list" class="pa-0" :class="{ xs: isXs }">
        <v-list class="fill-height" flat rounded>
          <v-list-item-group>
            <v-list-item @click="viewType = val" :key="val" v-for="val in availableModel">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ val }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col id="col-content" cols="12" sm="9" class="d-flex flex-column" :class="{ xs: isXs }">
        <transition name="item-fade" mode="out-in">
          <v-row class="mx-0 flex-1" style="height: min-content;">
            <v-col cols="12">
              <v-card-title class="py-0">
                {{ viewType || "Data" }}
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  class="pb-4"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="headers"
                :items="data"
                :items-per-page="10"
                :search="search"
                flat
                show-select
                item-key="name"
              >
                <template v-slot:item.content="{ item }">{{item.content.substring(0, 20)}}</template>
                <template v-slot:item.summary="{ item }">{{item.summary.substring(0, 20)}}</template>
                <!-- <template v-slot:item.name="props">
                  <v-edit-dialog
                    :return-value.sync="props.item.name"
                    @save="save"
                    @cancel="cancel"
                    @open="open"
                    @close="close"
                  >
                    {{ props.item.name }}
                    <template v-slot:input>
                      <v-text-field
                        v-model="props.item.name"
                        :rules="[max25chars]"
                        label="Edit"
                        single-line
                        counter
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                </template>-->
              </v-data-table>
            </v-col>
          </v-row>
        </transition>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getData } from "../queries/queryContents";

export default {
  name: "AdminStatistics",
  data: () => ({
    hightlightVisited: [1234, 1230, 1340, 1620, 2000, 1900, 812],
    hightlightComments: [423, 446, 675, 510, 590, 610, 760],
    hightlightPosted: [423, 346, 175, 610, 890, 610, 1060],
    events: [],
    scheduleFocus: "",
    scheduleType: "month",
    scheduleTypeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ],
    search: "",
    viewType: "",
    availableModel: ["GENERAL", "POST", "CONTENT"],
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Calories", value: "calories" },
      { text: "Fat (g)", value: "fat" },
      { text: "Carbs (g)", value: "carbs" },
      { text: "Protein (g)", value: "protein" },
      { text: "Iron (%)", value: "iron" },
    ],
    data: [
      {
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%",
      },
      {
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%",
      },
      {
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%",
      },
      {
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%",
      },
      {
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%",
      },
      {
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%",
      },
      {
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%",
      },
      {
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%",
      },
      {
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%",
      },
      {
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%",
      },
    ],
  }),
  mounted () {
    this.$refs.calendar.checkChange();
  },
  computed: {
    title () {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.scheduleType) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "4day":
          return `${startMonth} ${startDay} ${startYear} - ${suffixMonth} ${endDay} ${suffixYear}`;
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter () {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    },
  },
  watch: {
    viewType (newVal, oldVal) {
      if (newVal != oldVal) {
        console.debug("querying: ", newVal);
        this.$apollo
          .query({
            client: "inspiredBy",
            fetchPolicy: 'no-cache',
            variables: {
              type: newVal,
            },
            query: getData,
          })
          .then((res) => {
            const data = JSON.parse(res.data.getData.data);
            console.debug("data: ", data);
            this.headers = [];
            for (let i in data[0]) {
              this.headers.push({
                text: i.toUpperCase(),
                align: "center",
                sortable: true,
                value: i,
              });
            }
            this.data = data;
          });
      }
    }
  },
  methods: {
    viewDay ({ date }) {
      this.scheduleFocus = date;
      this.scheduleType = "day";
    },
    getEventColor (event) {
      return event.color;
    },
    setToday () {
      this.scheduleFocus = this.today;
    },
    prev () {
      this.$refs.calendar.prev();
    },
    next () {
      this.$refs.calendar.next();
    },
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange ({ start, end }) {
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }

      this.start = start;
      this.end = end;
      this.events = events;
    },
    nth (d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate (a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
        1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    },
    focus () {
      this.$scrollTo(document.querySelector("#config-box #col-content"), 1000, {
        offset: 100,
      });
    },
  }
};
</script>

<style lang="scss" scoped>
#col-content {
  height: calc(100vh - 7em);
  background: red;
  overflow: auto;
  overflow-x: hidden;
  padding: 0;
  max-width: 100%;
}
</style>
<style lang="scss">
.v-calendar-weekly__day {
  border-right: transparent;
  border-color: rgba(255, 255, 255, 0.22) !important;
}
</style>
