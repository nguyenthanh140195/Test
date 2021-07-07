<template>
  <div id="slider">
    <div class="header">
      <div>HHH</div>
      <div>HHH</div>
    </div>
    <div>sbdmsd</div>
    <div>sbdmsd</div>
    <div>sbdmsd</div>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log(window);
    window.$("#slider").addClass("ttteesst");
    window.$("#slider").draggable({
      handle: ".header",
      containment: "body",
    });
  },
};
</script>

<style scoped>
#slider {
  display: inline-block;
}
</style>