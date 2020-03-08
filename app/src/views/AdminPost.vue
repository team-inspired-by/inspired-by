<template>
  <div>
    <custom-subheader title="Contents Editor" indent />
    <v-row id="config-box" ref="config-box" @click="focus()">
      <v-col cols="12" md="3" class="pr-0 pl-5">
        <v-list class="card-list fill-height" flat rounded>
          <v-list-item-group>
            <v-list-item @click="editType = ''">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Create Post</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </v-list-item-group>
          <v-list-item-group v-model="selectedContentsEditorTopic" mandatory class="pt-5찬">
            <v-list-item v-for="(topic, i) in topicLists" :key="i">
              <v-list-item-icon>
                <v-icon>
                  mdi-alpha-{{
                  topic["text"][0].toLowerCase()
                  }}-circle-outline
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="topic['text']"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col cols="12" md="9">
        <v-row class="card-content">
          <v-col v-if="editType == 'General Post'">
            <custom-writer></custom-writer>
          </v-col>
          <v-col v-if="!editType">
            <v-row class="text-center px-3">
              <v-col cols="6" :key="key" v-for="val, key in writingTypes">
                <v-card
                  class="select-post-type py-3"
                  :color="val.color"
                  flat
                  @click="editType = val.postType"
                >
                  <v-icon size="5em">mdi-{{val.icon}}</v-icon>
                  <h3>
                    create
                    <b>{{val.postType}}</b>
                  </h3>
                  <v-divider />
                  <p class="mb-0">{{val.description}}</p>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { TestGitQuery } from "../queries/repo"

export default {
  name: "AdminPost",
  apollo: {
    clients: {
      query () {
        return TestGitQuery;
      },
      update: data => {
        console.log('testing git query:')
        console.log(data)
        return data
      }
    }
  },
  data: () => ({
    testing: null,
    editType: '',
    selectedContentsEditorTopic: 0,
    writingTypes: [{
      postType: 'Git Post',
      icon: 'git',
      description: 'link your git project',
    },
    {
      postType: 'General Post',
      icon: 'newspaper',
      description: 'normal posts',
    },
    {
      postType: 'Book Post',
      icon: 'book',
      description: 'for book review',
    },
    {
      postType: 'Series',
      icon: 'ballot',
      description: 'sum up the posts',
    }]
  }),
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    topicLists () {
      return this.$store.getters.getTopicLists;
    }
  },
  mounted () { },
  methods: {
    focus () {
      this.$scrollTo(document.getElementById('config-box'), 1000, {
        offset: 100,
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.card-content {
  height: calc(100vh - 7em);
  overflow: auto;
  padding: 0;
  max-width: 100%;
  .select-post-type {
    opacity: 0.6;
    transition: opacity 0.5s;
    background: transparent !important;
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
