<!-- localhost:5173/coopercodes1@gmail.com -->
<script lang="ts">
    import { page } from "$app/stores";
    export let data;

    let { supabase, session } = data
    $: ({ supabase, session } = data)
    $: email = $page.params.email;

    let questionTypeList: any = ["Single-Choice", "Multi-Choice", "Custom Rating", "Single-Number", "Multi-Number", "Open-End Single Text", "Open-End Text Box", "Name & Address", "Not Asked"]
    let zeta: any = []

    let isModalOpen = false;
    let searchInput = "";

    // profiles in Supabase which has columns for a description, pokemon_ids, email
    // from this page, we can use the supabase object to then save to our database (grab data)

   

    async function savePageEdits() {
        // await saveProfile();
        
        isModalOpen = false;
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
                                    <img src={nonsense.sprites.front_default} alt="nonsense" class="w-32 h-32 mx-auto" />
                                    <h2 class="text-white text-2xl font-bold">{nonsense.name}</h2>
                                    <p class="text-info">{nonsense.types[0].type.name}</p>
                                </div>
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
            {#if email == session?.user?.email}
                <button class="btn btn-info" on:click={() => isModalOpen = true}>Insert Question</button>
                <dialog class="modal min-w-lg" class:modal-open={isModalOpen}>
                    <div class="modal-box">
                        <div class='close-container text-right'>
                            <button class="close inline-block" on:click={() => isModalOpen = false}>X</button>
                        </div>
                        <h3>Insert Question</h3>
                        <p>Here you can insert your questions that make up your survey.</p>
                        <!-- <p class="text-white p-2">Edit your description</p>
                        <textarea 
                            bind:value={profile.description} 
                            class="textarea textarea-bordered textarea-lg w-full max-w-md h-[300px]"
                        /> -->
                        <p class="text-black p-2">Select your question type.</p>
                        <div class="grid grid-cols-3 overflow-y-scroll max-h-[600px] m-3">

                            {#each questionTypeList as questionType, index} <!-- questionType are 1 indexed -->
                                <!-- "char" -> "charmander", "charizard" -->
                                <!-- {(console.log({ questionType }), '')} -->
                                {#if questionType === "Single-Choice"}
                                    <button 
                                        class={
                                            "card bg-slate-700 h-12 p-1 m-1 justify-center items-center enabled "
                                            + (questionType
                                            ? "border-2 border-blue-600"
                                            : "")
                                        }
                                    >

                                        <div class="text=center">
                                            <h2 class="text-base text-white leading-4">{questionType}</h2>
                                        </div>
                                    </button>

                                {:else}
                                        <button 
                                        class={
                                            "card bg-slate-700 h-12 p-1 m-1 justify-center items-center disabled "
                                            + (questionType
                                            ? "border-2 border-blue-600"
                                            : "")
                                        }
                                    >

                                        <div class="text=center">
                                            <h2 class="text-base text-white leading-4">{questionType}</h2>
                                        </div>
                                    </button>
                                {/if}
                            {/each}
                        </div>
                        <button class="btn btn-success" on:click={() => savePageEdits()}>Save Edits</button>
                    </div>
                </dialog>
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
    .close{
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
</style>