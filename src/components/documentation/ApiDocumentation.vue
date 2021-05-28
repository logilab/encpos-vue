<template>
  <section>
    <h1>Titre principal</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>

    <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=Pastoureau"
    />

    <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=metadata.author_name:Diplomatie+OR+metadata.title_rich:Diplomatie+OR+metadata.author_firstname:Diplomatie&range[metadata.promotion_year]=gte:1849,lte:2017&page[number]=1&page[size]=40"
    />

    <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=metadata.author_name:Diplomatie+OR+metadata.title_rich:Diplomatie+OR+metadata.author_firstname:Diplomatie&range[metadata.promotion_year]=gte:1849,lte:2017&page[number]=1&page[size]=40"
    />
  </section>
</template>
<script>
import ApiCallDropdown from "@/components/documentation/ApiCallDropdown";

export default {
  name: "ApiDocumentation",
  components: {
    ApiCallDropdown,
  },
};
</script>

<style scoped></style>
