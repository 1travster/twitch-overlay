const CLIENT_ID = 2l69vgoo4pmnvif7xikevn4brobguz;  // Replace with your Twitch Client ID
const CLIENT_SECRET = apdtyr90l8vx92qxtwh2gjnmif5b25;  // Replace with your Twitch Client Secret
const CHANNEL_NAME = 1Travster;  // Replace with your Twitch channel name

async function getAccessToken() {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        body: new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: "client_credentials"
        })
    });
    const data = await response.json();
    return data.access_token;
}

async function getUserID(accessToken) {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${CHANNEL_NAME}`, {
        headers: {
            "Client-ID": CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.data[0].id;
}

async function getFollowers(userID, accessToken) {
    const response = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${userID}`, {
        headers: {
            "Client-ID": CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.data;
}

async function getSubscribers(userID, accessToken) {
    const response = await fetch(`https://api.twitch.tv/helix/subscriptions?broadcaster_id=${userID}`, {
        headers: {
            "Client-ID": CLIENT_ID,
            "Authorization": `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    return data.data;
}

async function updateOverlay() {
    const accessToken = await getAccessToken();
    const userID = await getUserID(accessToken);

    const followers = await getFollowers(userID, accessToken);
    document.getElementById("follower-text").innerText = followers.length > 0 
        ? followers[0].from_name 
        : "No new followers";

    const subscribers = await getSubscribers(userID, accessToken);
    document.getElementById("subscriber-text").innerText = subscribers.length > 0 
        ? subscribers[0].user_name 
        : "No new subscribers";
}

// Fetch new data every 30 seconds
setInterval(updateOverlay, 30000);
updateOverlay();
