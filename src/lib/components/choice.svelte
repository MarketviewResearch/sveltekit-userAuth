<script>
  export let CheckBoxName;
  export let CheckBoxID;
  export let textAreaID;
  export let choiceText;
</script>

<div class="choice-row-container mb-2">
  <input type="checkbox" name={CheckBoxName} id={CheckBoxID} />
  <textarea class="choiceText h-6 w-60 resize-none ml-5 pl-1" id={textAreaID}
    >{choiceText}</textarea
  >
</div>

<style>
  .choice-row-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
