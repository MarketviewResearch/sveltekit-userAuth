<script>
  export let CheckBoxName;
  export let CheckBoxID;
  export let textAreaID;
  export let choiceText;
</script>

<div class="choice-row-container">
  <input type="checkbox" name={CheckBoxName} id={CheckBoxID} />
  <textarea
    class="h-6 w-60 resize-none ml-5 mb-2"
    id={textAreaID}
  >{choiceText}</textarea>
</div>

<style>
  .choice-row-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
