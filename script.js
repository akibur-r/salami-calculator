const salamiContainer = document.getElementById('salamiContainer');


async function calculateSalami(handle) {
    try {
        const res = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const data = await res.json();
        const contestList = data.result;
        let maxRating = 0;
        contestList.forEach(contest => {
            maxRating = Math.max(maxRating, contest.newRating);    
        });

        if(maxRating < 500) return 0.00;
        else if(maxRating < 1000) return 1.96;
        else if(maxRating < 1200) return 4.97;
        else if(maxRating < 1400) return 9.98;
        else return 14.99;
    } catch (error) {
        alert("Enter valid codeforces handle");
    }
}

document.getElementById('calculateBtn').addEventListener('click', async ()=> {
    document.getElementById('btnText').classList.add('hidden');
    document.getElementById('loader').classList.remove('hidden');
    const handleContainer = document.getElementById('handleContainer');
    const cf_handle = handleContainer.value.trim();

    if(!cf_handle) {
        alert("Enter your handle!");    
        document.getElementById('loader').classList.add('hidden');
        document.getElementById('btnText').classList.remove('hidden');
        return;
    }

    const salamiAmount = await calculateSalami(cf_handle);

    // alert(salamiAmount)
    if(!salamiAmount) {
        salamiContainer.textContent = "Oops! No salami for you.";
    }
    else {
        salamiContainer.innerHTML = `
            <div class="flex flex-col">
                <span class="font-semibold">Your Salami is: BDT ${salamiAmount}</span><br/>
                <button class="cursor-pointer underline text-primary" onclick="my_modal_2.showModal()">
                How to Claim
                </button>
            </div>
        `
    }

    salamiContainer.classList.remove('hidden');

    document.getElementById('loader').classList.add('hidden');
    document.getElementById('btnText').classList.remove('hidden');
})

// my_modal_2.showModal()