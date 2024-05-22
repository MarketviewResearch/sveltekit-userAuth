<script lang="ts">
  function deleteChoices(): void {
    var choiceLength = document.querySelectorAll(".choice-row-container").length;

    if (choiceLength > 1) {
      let checkedBoxes: NodeListOf<HTMLInputElement> = document.querySelectorAll("input[name^=checkCoice]:checked");
    
    
      checkedBoxes.forEach((element: HTMLInputElement) => element.parentElement?.remove());

      choiceLength = document.querySelectorAll(".choice-row-container").length;
      // console.log(choiceLength);
      if (choiceLength == 0) {
        var choicesContainer = document.querySelectorAll("#choices-container");
        choicesContainer[0].append(checkedBoxes[0].parentElement);
      }
    }
  }
</script>

<button  class="bg-info hover:bg-blue-700 text-black py-1 px-2 border border-blue-700 rounded mt-2"  on:click={deleteChoices}>Delete Choices</button>
