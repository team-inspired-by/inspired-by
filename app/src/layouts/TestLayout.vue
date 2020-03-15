<template>
  <div>
    <h1>test Layout</h1>
    <custom-subtitle></custom-subtitle>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { TestMutation, TestQuery } from "../queries/repo";

export default {
  apollo: {
    clients: {
      // query () {
      //   return TestQuery;
      // },
      // update: data => {
      //   console.log(`data received:`);
      //   console.log(data);
      // }
    }
  },
  mounted () {
    this.$store.commit("setTopic", this.$route.params.inspiration);
  }
}
</script>