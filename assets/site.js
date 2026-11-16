(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Intro: the Ilisus mark draws itself, once per visit */
  var intro = document.getElementById("intro");
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem("ilisus-intro") === "1"; } catch (e) {}
    var done = function () {
      if (intro.classList.contains("gone")) return;
      intro.classList.add("gone");
      document.body.style.overflow = "";
      setTimeout(function () { intro.hidden = true; }, 650);
      try { sessionStorage.setItem("ilisus-intro", "1"); } catch (e) {}
    };
    if (seen || reduce) { intro.hidden = true; }
    else {
      document.body.style.overflow = "hidden";
      setTimeout(done, 3000);
      intro.addEventListener("click", done);
      addEventListener("keydown", function (e) { if (e.key === "Escape" || e.key === "Enter") done(); });
    }
  }

  /* Hero video: make sure it starts muted and loops, with a pause control */
  var v = document.getElementById("hvid"), pb = document.getElementById("hpause");
  if (v) {
    v.muted = true; v.loop = true; v.playsInline = true;
    var p = v.play(); if (p && p.catch) p.catch(function () {});
    if (pb) pb.addEventListener("click", function () {
      if (v.paused) { v.play(); pb.textContent = "❚❚"; pb.setAttribute("aria-label", "Pause the background video"); }
      else { v.pause(); pb.textContent = "▶"; pb.setAttribute("aria-label", "Play the background video"); }
    });
  }

  /* Reveal on scroll */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (el) { io.observe(el); });
  } else rv.forEach(function (el) { el.classList.add("in"); });

  /* Make the Call: a playable sample of an Ilisus experience */
  var box = document.getElementById("callgame");
  if (!box) return;
  var CHOICES = [
    { id: "cross", t: "Cross the Delaware on Christmas night and strike Trenton", s: "Risky. A night crossing in winter, against a trained garrison.", label: "What happened",
      head: "You crossed. It worked.",
      body: ["On the night of 25 December, about 2,400 men cross at McConkey's Ferry through ice, wind and sleet. The two other planned crossings do not get across in force, so your column goes in alone.",
             "At dawn you hit the Hessian garrison at Trenton. In under two hours about 900 Hessians are captured, and their commander, Colonel Johann Rall, is mortally wounded. American losses are very light. Days later, many men whose enlistments were ending agree to stay six more weeks, and on 3 January you win again at Princeton."],
      src: "This is what Washington chose. Source: David Hackett Fischer, Washington's Crossing (2004)." },
    { id: "wait", t: "Go into winter quarters and wait for spring", s: "Safe for now. Rebuild the army and fight when the roads open.", label: "Counterfactual",
      head: "The army may not last until spring.",
      body: ["Most of your soldiers' enlistments run out on 31 December. With no victory to show them, many go home, and the recruiting drive for 1777 starts from almost nothing.",
             "This is the outcome Washington feared most. In a letter to his brother that month he wrote that he thought the game was pretty near up. Waiting meant giving the cause time to fade."],
      src: "A reasoned guess, not a record. Based on the enlistment crisis described in Fischer, Washington's Crossing." },
    { id: "fall", t: "Fall back to defend Philadelphia", s: "Protect the capital, keep Congress safe.", label: "Counterfactual",
      head: "Congress has already left.",
      body: ["On 12 December, Congress voted to leave Philadelphia and meet in Baltimore. Falling back protects an empty capital and hands all of New Jersey to the British without a fight.",
             "The British army stays spread across New Jersey in winter posts, which is exactly the opening Washington saw. Retreating would have closed it."],
      src: "A reasoned guess, not a record. Congress's move to Baltimore is documented in the Journals of the Continental Congress." }
  ];
  var opts = box.querySelector(".dopts"), out = box.querySelector(".dout-slot"), sc = box.querySelector(".score");
  var tried = {};
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  opts.innerHTML = CHOICES.map(function (c) {
    return '<button type="button" class="dopt" aria-pressed="false" data-id="' + c.id + '"><span><b>' + esc(c.t) + '</b><small>' + esc(c.s) + '</small></span><span class="jl" aria-hidden="true">Choose</span></button>';
  }).join("");
  function pick(id) {
    var c = CHOICES.filter(function (x) { return x.id === id; })[0];
    tried[id] = 1;
    opts.querySelectorAll(".dopt").forEach(function (b) {
      var on = b.getAttribute("data-id") === id;
      b.setAttribute("aria-pressed", on);
      b.querySelector(".jl").textContent = on ? c.label : (tried[b.getAttribute("data-id")] ? "Seen" : "Choose");
    });
    out.innerHTML = '<div class="dout" role="status"><b>' + esc(c.head) + '</b>' + c.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") +
      '<p class="src">' + esc(c.src) + '</p>' +
      (Object.keys(tried).length < CHOICES.length ? '<p class="src">Try the other choices to see how the war might have turned.</p>' :
        '<div class="btns"><a class="btn" href="about.html">See what Ilisus is building →</a><a class="btn line" href="https://liberty.ilisus.com/" target="_blank" rel="noopener">Follow it on the map in Liberty</a></div>') +
      "</div>";
    sc.innerHTML = CHOICES.map(function (x) { return '<i class="' + (tried[x.id] ? "on" : "") + '"></i>'; }).join("");
  }
  opts.addEventListener("click", function (e) { var b = e.target.closest(".dopt"); if (b) pick(b.getAttribute("data-id")); });
  sc.innerHTML = CHOICES.map(function () { return "<i></i>"; }).join("");
})();
