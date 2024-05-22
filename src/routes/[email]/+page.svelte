<!-- localhost:5173/haphazerdous@gmail.com -->
<script lang="ts">
  import { page } from "$app/stores";
  import choice from "$lib/components/choice.svelte";
  import DeleteChoicesButton from "$lib/components/DeleteChoicesButton.svelte";

  export let data;

  let { supabase, session } = data;
  $: ({ supabase, session } = data);

  $: email = $page.params.email;

  let questionTypeList: any = [
    "Single-Choice",
    "Multi-Choice",
    "Custom Rating",
    "Single-Number",
    "Multi-Number",
    "Open-End Single Text",
    "Open-End Text Box",
    "Name & Address",
    "Not Asked",
  ];
  let zeta: any = []; // dummy variable for testing

  var question: any = {
    mapped_question: "Mapped Question Num",
    questiontext: "What is your question text?",
    choices: ["Choice A", "Choice B", "Choice C"],
  };

  let wasFirstChoiceDeleted: boolean = false;
  console.log(wasFirstChoiceDeleted);

  page.subscribe(async () => {
    // .subscribe is a callback function that triggers when the route changes

    // Try to grab the current account question data based on user login (haphazerdous@gmail.com)
    const { data: questionData, error: questionError } = await supabase
      .from("question")
      .select("mapped_question, questiontext, choices")
      .eq("account_email", email);

    if (questionData === undefined && email == session?.user?.email) {
      // save questions
    } else if (questionData != null && questionData.length > 0) {
      question = questionData[0];
    } else {
      console.log("No Profile");
      question = {
        mapped_question: "Error",
        questiontext: "This user does not have a question text yet!",
        choices: [],
      };
    }
  });

  let isQuestionTypeModalOpen = false;
  let showQuestionEditor = false;

  function toggleQuestionEditor() {
    showQuestionEditor = !showQuestionEditor;
  }

  function questionTypeSelected() {
    isQuestionTypeModalOpen = false;
  }

  function insertChoices(e: Event): void {
    // function runs when chocies pasted into choice input, reads choices and dynamically creates choice rows for each choice on clipboard
    var choices = (e.target as HTMLInputElement).value.split("\n");
    // console.log(choices);
    for (let i = 0; i < choices.length; i++) {
      if (i > 0) {
        const newChoiceRow = new choice({
          target: document.querySelector("#choices-container") as HTMLElement,
          props: {
            CheckBoxName: `checkCoice_${i + 1}`,
            CheckBoxID: `checkCoice_${i + 1}`,
            textAreaID: `c${i + 1}`,
            choiceText: choices[i],
          },
        });
      }
    }
    (document.getElementById("c1")! as HTMLInputElement).value = choices[0]; // set the value of the 1st choice row as the 1st item on the clipboard
  }

  let questionText = "";
  async function saveQuestion() {
    let choices: string[] = [];
    const choiceNodeArray: NodeListOf<Element> =
      document.querySelectorAll(".choiceText");
    choiceNodeArray.forEach((choice) =>
      choices.push((choice as HTMLInputElement).value),
    );
    console.log(`choices are ${choices}`);
    // const { data: profileData, error: profileError } = await supabase.from("question").select("*").eq('account_email', email)

    if (questionText != "" && choices.length != 0) {
      console.log("fired");
      const { data, error } = await supabase.from("question").insert({
        account_id: session?.user?.id,
        account_email: session?.user?.email,
        questiontext: questionText,
        choices: choices,
      });
    } else {
      // alert
      alert(
        "Be sure to have both the question text and choices created before trying to submit the question.",
      );
    }
  }
</script>

<div class="hero min-h-screen bg-base-content">
  <div class="hero-content">
    <div class="max-w-2xl text-center">
      <h1 class="text-white font-bold text-4xl">{email}'s Page</h1>
      <p class="py-3 max-w-md mx-auto">placeholder</p>
      <div class="grid grid-cols-3">
        {#if zeta === undefined}
          <p>Loading...</p>
        {:else}
          {#each zeta as nonsense}
            <div class="card bg-slate-700 m-4 shadow-lg shadow-blue-900">
              <div class="card-body">
                <div class="text-center">
                  <img
                    src={nonsense.sprites.front_default}
                    alt="nonsense"
                    class="w-32 h-32 mx-auto"
                  />
                  <h2 class="text-white text-2xl font-bold">{nonsense.name}</h2>
                  <p class="text-info">{nonsense.types[0].type.name}</p>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
      {#if email == session?.user?.email}
        {#if showQuestionEditor == false}
          <button
            class="btn btn-info"
            on:click={() => (isQuestionTypeModalOpen = true)}
            >Insert Question</button
          >
        {/if}
        <dialog
          class="modal min-w-lg"
          class:modal-open={isQuestionTypeModalOpen}
        >
          <div class="modal-box">
            <div class="close-container text-right">
              <button
                class="close inline-block"
                on:click={() => (isQuestionTypeModalOpen = false)}>X</button
              >
            </div>
            <h3>Insert Question</h3>
            <p>Here you can insert your questions that make up your survey.</p>
            <!-- <p class="text-white p-2">Edit your description</p>
                        <textarea 
                            bind:value={profile.description} 
                            class="textarea textarea-bordered textarea-lg w-full max-w-md h-[300px]"
                        /> -->
            <p class="text-black p-2">Select your question type.</p>
            <div class="grid grid-cols-3 max-h-[600px] m-3">
              {#each questionTypeList as questionType, index}
                <!-- questionType are 1 indexed -->
                <!-- "char" -> "charmander", "charizard" -->
                <!-- {(console.log({ questionType }), '')} -->
                {#if questionType === "Single-Choice"}
                  <button
                    class={"card bg-slate-700 h-12 p-1 m-1 justify-center items-center enabled " +
                      (questionType ? "border-2 border-blue-600" : "")}
                    id="sc"
                    on:click={() => questionTypeSelected()}
                    on:click={toggleQuestionEditor}
                  >
                    <div class="text=center">
                      <h2 class="text-base text-white leading-4">
                        {questionType}
                      </h2>
                    </div>
                  </button>
                {:else}
                  <button
                    class={"card bg-slate-700 h-12 p-1 m-1 justify-center items-center disabled " +
                      (questionType ? "border-2 border-blue-600" : "")}
                  >
                    <div class="text=center">
                      <h2 class="text-base text-white leading-4">
                        {questionType}
                      </h2>
                    </div>
                  </button>
                {/if}
              {/each}
            </div>
          </div>
        </dialog>
      {/if}
      {#if showQuestionEditor}
        <button
          class="btn btn-info"
          on:click={() => (showQuestionEditor = false)}>Cancel</button
        >
        <div class="question-editor border-2 border-black mt-6">
          <div class="question-editor-container">
            <h3 class="mt-1 text-white text-xl">Single Choice</h3>
            <textarea
              name="questionText"
              id="qtext"
              placeholder="Enter your question text here..."
              bind:value={questionText}
              on:keydown={() => console.log(questionText)}
            ></textarea>
            <div class="mb-2" id="choices-container">
              <div class="choice-row-container mb-2">
                <input
                  type="checkbox"
                  name="checkCoice_1"
                  class="choiceCheckbox"
                  id="checkCoice_1"
                />
                <textarea
                  class="choiceText h-6 w-60 resize-none ml-5 pl-1"
                  id="c1"
                  placeholder="Paste Choices"
                  on:input={insertChoices}
                ></textarea>
              </div>
            </div>
            <DeleteChoicesButton />
            <button
              class="questionSubmit text-white border-2 border-white p-1 mt-2 mb-2 hover:bg-sky-600"
              on:click={saveQuestion}>Submit</button
            >
          </div>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .disabled {
    pointer-events: none;
    background-color: grey;
    border: black solid 1px;
  }
  .close {
    display: inline-block;
    position: relative;
    bottom: 1.3rem;
    left: 1rem;
    cursor: pointer;
    font-weight: bold;
  }
  .close:hover {
    color: #b6b8bb;
  }
  #qtext {
    width: 80%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    resize: none;
    height: 5rem;
  }
  .choice-row-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
</style>
