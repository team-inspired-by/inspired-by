<template>
  <v-row class="subheader-box" :class="{'reversed': reversed, 'indent': indent}">
    <v-col class="pa-0 mt-0" cols="12">
      <div class="leftside edge" :class="{'reversed': reversed, 'indent': indent}"></div>
      <div id="title-subheader">
        <span v-if="title">{{title}}</span>
      </div>
      <div class="rightside edge" :class="{'reversed': reversed}"></div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "custom-sub-header",
  props: {
    'title': String,
    'reversed': Boolean,
    'indent': Boolean
  },
}
</script>

<style lang="scss" scoped>
.subheader-box {
  margin-bottom: -2px;
  &.indent:after,
  &.indent.reversed:before {
    display: block;
    content: "";
    width: 100%;
    height: 1em;
    margin: -2px 0 -0.5em 3.7em;
    border-left: 2px solid rgba(255, 255, 255, 0.12);
    padding: 0;
    z-index: 0;
  }
  &.indent.reversed:before {
    margin: -0.5em 0 0 3.7em;
  }
  &.indent.reversed:after {
    display: none;
  }
  .col {
    display: flex;
    margin-top: -2em;
    margin-bottom: 2em;
    .col.indent {
      margin-bottom: 2.5em;
    }
    #title-subheader {
      flex: 1;
      text-align: center;
      padding-top: 0;
      border-bottom: 2px solid rgba(255, 255, 255, 0.12);
      span {
        position: relative;
        top: 1.2em;
        background: #424242;
        border-radius: 0.5em;
        color: #999;
        font-size: medium;
        padding: 0.25em 0.5em;
      }
    }
    .col.indent #title-subheader span {
      margin-right: 3.7em;
    }
    .edge {
      display: block;
      width: 2em;
      height: 2em;
      // margin-top: -0.9em;
      // margin-bottom: -2em;
      border: 2px solid rgba(255, 255, 255, 0.12);
      &.leftside {
        position: relative;
      }
      &.leftside.indent {
        margin-left: 3.7em;
      }
      &.rightside {
        position: relative;
      }
      &.leftside:not(.reversed) {
        top: calc(2em - 2px);
        border-bottom: none;
        border-right: none;
        border-top-left-radius: 2em;
      }
      &.rightside:not(.reversed) {
        top: 0;
        border-top: none;
        border-left: none;
        border-bottom-right-radius: 2em;
      }
      &.reversed.leftside {
        top: 0;
        border-top: none;
        border-right: none;
        border-bottom-left-radius: 2em;
      }
      &.reversed.rightside {
        top: calc(2em - 2px);
        border-bottom: none;
        border-left: none;
        border-top-right-radius: 2em;
      }
    }
  }
}
</style>
