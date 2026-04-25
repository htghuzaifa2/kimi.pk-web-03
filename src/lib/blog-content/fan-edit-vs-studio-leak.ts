export default `<h2>Fan-Edit vs. Studio Leak – A Forensic Checklist You Can Run in 5 Minutes (No Software Required)</h2>
      <h3>1. CGI Quality – 3 Quick Pixel Tells</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Test</th>
              <th class="border border-border p-2 text-left">Fan-Edit Red Flag</th>
              <th class="border border-border p-2 text-left">Studio-Leak Green Flag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">Edge Halos</td>
              <td class="border border-border p-2">Zoom 400 % – thin white rim around characters = cheap luma-key</td>
              <td class="border border-border p-2">Edges blend into grain; no halo even at 600 %</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Motion Blur Vector</td>
              <td class="border border-border p-2">Pause during fast swing – if web-lines are crisp while background is streaky, blur was added after render (fan shortcut)</td>
              <td class="border border-border p-2">Both foreground & background share same vector blur – blur baked in render pass</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Contact Shadows</td>
              <td class="border border-border p-2">Spider lands – no shadow deformation on rubble = CG plate never ray-traced</td>
              <td class="border border-border p-2">Micro-shadow bounces as fabric flexes; screen-space reflection visible in puddle for 3 frames</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-2">Rule of thumb: Studio leaks still show pre-vis softness but never missing contact shadows; fans delete them to hide low-res models.</p>
      <h3>2. Audio Mix – Headphone Test</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Second 0-10</th>
              <th class="border border-border p-2 text-left">Fan-Edit</th>
              <th class="border border-border p-2 text-left">Studio Leak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">LFE Channel</td>
              <td class="border border-border p-2">No sub-20 Hz rumble – your headphones don’t vibrate</td>
              <td class="border border-border p-2">18 Hz infrasonic ramp (you feel it, not hear it)</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Dialogue</td>
              <td class="border border-border p-2">Center channel only – mute left/right and speech disappears</td>
              <td class="border border-border p-2">Dialogue bleed into L/R at -18 dB – keeps clarity when center is down-mixed</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Watermark Chirp</td>
              <td class="border border-border p-2">Absent (fan stripped it)</td>
              <td class="border border-border p-2">18 kHz tone still present even after 1080p re-encode – proves pre-release pedigree</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-2">DIY check: Record 5 s of audio into free spectrogram (Audacity). Line at 18 kHz = studio forensic watermark survived; blank space = fan rebuild.</p>
      <h3>3. Invisible Watermark – Visual Hunt</h3>
      <p>Studio leaks carry noise-pattern fingerprints that survive crops, blurs, even cam-rips.</p>
      <p>Spot them without code:</p>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li>Invert colors on a dark frame – look for checkerboard of ±1 RGB values repeating every 64 pixels.</li>
        <li>Flip frame horizontally – subtract from original in Photoshop “difference” mode – watermark lights up like a QR code.</li>
      </ul>
      <p>Fans can’t replicate this because the pattern is seeded with vendor-private key; if you see random noise only, it’s fan-edit.</p>
      <h3>4. Metadata Smell Test</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse border border-border">
          <thead>
            <tr>
              <th class="border border-border p-2 text-left">Field</th>
              <th class="border border-border p-2 text-left">Fan-Edit</th>
              <th class="border border-border p-2 text-left">Studio Leak</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-border p-2">Encoder</td>
              <td class="border border-border p-2">HandBrake 1.6.0 or ffmpeg 4.4</td>
              <td class="border border-border p-2">ATEME Titan or DaVinci Resolve Studio (vendor stamps)</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Color Primaries</td>
              <td class="border border-border p-2">BT.709 (YouTube safe)</td>
              <td class="border border-border p-2">BT.2020 – proves HDR master was down-converted</td>
            </tr>
            <tr>
              <td class="border border-border p-2">Frame Count vs. Runtime</td>
              <td class="border border-border p-2">24.000 fps exact (fan re-encode)</td>
              <td class="border border-border p-2">23.976 fps – broadcast spec used in DCP packages</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="mt-2">Right-click file → Properties → Details – if you see “x265 3.5+1-f0c2542”, hobbyist encode; “Titan 2025.2.4.0” = real pipeline.</p>
      <h3>5. 5-Second Forensic Challenge</h3>
      <ul class="list-disc list-inside space-y-2 pl-2">
        <li>Zoom 600 % on a glowing eye – hard edge = fake; soft chromatic aberration = studio.</li>
        <li>Mute center channel – dialogue vanishes = fan; still audible = studio leak.</li>
        <li>Look for 18 kHz line – present = pre-release; absent = re-upload.</li>
        <li>Invert dark frame – geometric noise = watermark; random static = fan.</li>
        <li>Check fps – 23.976 = vendor; 24.000 = YouTube rip.</li>
      </ul>
      <p>Score 4/5 = you’re holding a studio leak; ≤2/5 = clever cosplay footage.</p>
      <h3>Bottom Line</h3>
      <p>Fans delete shadows, strip chirps, and normalize fps – all dead giveaways under a free spectrogram and a zoom lens.</p>
      <p>Studio leaks are messy but mathematically alive – hidden noise, buried bass, and time-code hiccups that only a $200 M pipeline leaves behind.</p>

      <h3 class="mt-8 text-2xl font-bold">🙋 Frequently Asked Questions (FAQ)</h3>
      <div class="space-y-6 mt-4">
        <div class="border-b border-border pb-4">
          <h4 class="text-lg font-semibold">What is the easiest way to spot an AI fake?</h4>
          <p class="mt-2 text-muted-foreground">Look at the hands and the eyes during motion. AI often struggles with consistent eye-line direction and "finger count" during fast action sequences in fan edits.</p>
        </div>
        <div class="border-b border-border pb-4">
          <h4 class="text-lg font-semibold">Why do studio leaks have grainy audio?</h4>
          <p class="mt-2 text-muted-foreground">They are usually recorded via "Camrip" (a phone in a theater) or intercepted before the final 7.1 surround mix, resulting in low-bitrate "hollow" sound.</p>
        </div>
        <div class="border-b border-border pb-4">
          <h4 class="text-lg font-semibold">Can a 4K leak be a fake?</h4>
          <p class="mt-2 text-muted-foreground">Yes. In 2026, AI upscalers can turn 1080p fan edits into 4K. Check the metadata for "Handbrake" or "FFmpeg" tags, which high-end studios rarely use for masters.</p>
        </div>
        <div class="border-b border-border pb-4">
          <h4 class="text-lg font-semibold">What does "23.976 fps" mean?</h4>
          <p class="mt-2 text-muted-foreground">It is the industry standard frame rate for cinema. Most fan edits are set to exactly 24.0 or 60.0 fps, making them feel "too smooth" or slightly off-cadence.</p>
        </div>
      </div>
      
      <div class="mt-12 p-6 bg-primary/5 rounded-lg border border-primary/10 text-center">
        <p class="italic text-lg text-muted-foreground">
          "Never forget the suffering of our brothers and sisters in Palestine. May Allah help them and protect them. Ya Allah, awaken the sleeping Ummah and make us worthy of supporting them. Ameen."
        </p>
        <p class="mt-4 font-semibold">— kimi.pk Team</p>
      </div>
`;


