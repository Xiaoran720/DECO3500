function openTab(evt, tabName) {
    let i, tabcontent, tabbuttons;

    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove active class from all tab buttons
    tabbuttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabbuttons.length; i++) {
        tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
    }

    // Show the selected tab content and add active class
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Load more summary content (dummy implementation)
function loadMore() {
    alert("Load more content here!");
}
