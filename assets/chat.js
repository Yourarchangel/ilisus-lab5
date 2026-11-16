/* Ilisus chatbot widget, shared by every page.
   Fill in ONE of these from your Chatling bot, commit, and the bot appears on every page.

   chatlingId: the number in Chatling's embed code (Deploy > Embed), the value of  chatbotId.
               Loads Chatling's own chat bubble.
   url:        a share link (Deploy > Share). Opens inside the Ilisus-styled panel instead.
               Also works for a Dify web app link. */
window.ILISUS_CHAT = window.ILISUS_CHAT || {
  chatlingId: "1249915198", /* Bot 2 - Inherited IRA Distribution Guidance (Lab 3) */
  url: "",
  title: "Ask our assistant",
  subtitle: "Built in Chatling"
};

(function () {
  var C = window.ILISUS_CHAT;

  /* Option 1: Chatling's own embed */
  if (C.chatlingId) {
    window.chtlConfig = { chatbotId: String(C.chatlingId) };
    var s = document.createElement("script");
    s.async = true;
    s.id = "chtl-script";
    s.type = "text/javascript";
    s.setAttribute("data-id", String(C.chatlingId));
    s.src = "https://chatling.ai/js/embed.js";
    document.body.appendChild(s);
    var tryOpen = function () {
      try {
        if (window.Chatling && typeof window.Chatling.open === "function") { window.Chatling.open(); return; }
        var b = document.querySelector("#chtl-open-chat-icon, #chtl-chat-icon, [id^='chtl'] button, [class*='chtl'] button");
        if (b) b.click();
      } catch (e) {}
    };
    document.querySelectorAll("[data-chat]").forEach(function (b) { b.addEventListener("click", tryOpen); });
    window.openIlisusChat = tryOpen;
    return;
  }

  /* Option 2: a share link inside the Ilisus panel */
  var src = C.url;
  var MARK = '<svg aria-hidden="true"><use href="#mark"/></svg>';

  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "chat-fab";
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "chatPanel");
  fab.setAttribute("aria-label", "Open the " + C.title + " chatbot");
  fab.innerHTML = '<span class="av">' + MARK + '</span><span class="lbl">' + C.title + '</span>';

  var panel = document.createElement("div");
  panel.className = "chat-panel";
  panel.id = "chatPanel";
  panel.hidden = true;
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", C.title + " chatbot");
  panel.innerHTML =
    '<div class="chat-head">' + MARK +
      '<div class="t"><b>' + C.title + '</b><span>' + C.subtitle + '</span></div>' +
      (src ? '<a href="' + src + '" target="_blank" rel="noopener" title="Open the chatbot in a new tab">New tab ↗</a>' : '') +
      '<button type="button" class="x" aria-label="Close the chatbot">×</button>' +
    '</div>' +
    '<div class="chat-body">' +
      (src ? '' : '<div class="chat-empty"><b>The chatbot is almost connected.</b>Paste your Chatling bot ID or share link into <code>assets/chat.js</code> and commit. The bot will load right here on every page.</div>') +
    '</div>';

  var body = panel.querySelector(".chat-body");
  var loaded = false;
  function open() {
    if (src && !loaded) {
      var f = document.createElement("iframe");
      f.src = src;
      f.title = C.title + " chatbot";
      f.allow = "microphone; clipboard-write";
      body.appendChild(f);
      loaded = true;
    }
    panel.hidden = false;
    fab.setAttribute("aria-expanded", "true");
    panel.querySelector(".x").focus();
  }
  function close() {
    panel.hidden = true;
    fab.setAttribute("aria-expanded", "false");
    fab.focus();
  }
  fab.addEventListener("click", open);
  panel.querySelector(".x").addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });
  document.querySelectorAll("[data-chat]").forEach(function (b) { b.addEventListener("click", open); });

  document.body.appendChild(fab);
  document.body.appendChild(panel);
  window.openIlisusChat = open;
})();
