importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js"
)

firebase.initializeApp({
  apiKey: "AIzaSyDCJegaHKFg7-cNEKEeBBCRsx3L0ewoNlc",
  authDomain: "poda-client.firebaseapp.com",
  projectId: "poda-client",
  storageBucket: "poda-client.appspot.com",
  messagingSenderId: "625465465195",
  appId: "1:625465465195:web:c40968dad6b93ed023542e",
  measurementId: "G-WESHG959HB",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )

  const link = payload.fcmOptions?.link || payload.data?.link

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // 알림에 사용할 아이콘 설정
    data: { url: link },
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.")

  event.notification.close()

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url

        if (!url) return

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus()
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT")
          return clients.openWindow(url)
        }
      })
  )
})
