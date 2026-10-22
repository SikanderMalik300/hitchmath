/* HitchMath embed height helper (optional). Listens for hitchmathHeight messages
   and sizes the matching iframe. Not required: the embed works without it. */
(function () {
  window.addEventListener('message', function (e) {
    var h = e && e.data && e.data.hitchmathHeight;
    if (!h) return;
    var frames = document.querySelectorAll('iframe[src*="hitchmath.com/embed/"]');
    for (var i = 0; i < frames.length; i++) {
      if (frames[i].contentWindow === e.source) frames[i].style.height = h + 'px';
    }
  });
})();
