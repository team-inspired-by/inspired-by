<template>
  <div>
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
  name: "AdminData",
  methods: {
    focus () {
      this.$scrollTo(document.querySelector("#config-box #col-content"), 1000, {
        offset: 100,
      });
    },
  },
  computed: {
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
    },
  },
  data () {
    return {
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
    };
  },
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
