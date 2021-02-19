<template>
<div>
<br>
    Metadonnée id : {{metadatas["@id"]}}
    <br>
    Metadonnée titre : {{metadatas["title"]}}
    <br>
    Metadonnée dts : {{metadatas["dts:extensions"]}}
    <br>
    Metadonnée dts coverage : {{metadatas["dts:extensions"]["ns2:coverage"]}}
    <br>
</div>
</template>

<script>
import { ref, toRefs, onMounted, watch } from "vue";
import { getMetadataFromApi} from "@/api/document";

export default {
  name: "Metadata",

  props: ["id"],


  setup(props) {
    let metadatas = ref([]);
    const { id } = toRefs(props);

    const getMetadata = async () => {
      metadatas.value = await getMetadataFromApi(id.value);
      console.log(metadatas);
    };
    
    onMounted(getMetadata);

    watch(id);

    return {
      getMetadata,
      metadatas
    };
  },
};
</script>