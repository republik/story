import type { InputData } from "./src/types";

export const twoVoicesData: InputData = {
  voices: [
    {
      key: "Ronja",
      name: "Ronja Beck",
    },
    {
      key: "Daniel",
      name: "Daniel Faulhaber",
      backgroundColor: "#99ff99",
    },
  ],
  chapters: [
    // ─── Chapter 1: Waking Up ────────────────────────────────────────────
    {
      title: "Waking Up",
      time: "6 Uhr",
      coverUrl: "https://picsum.photos/seed/morning-light/800/500",
      pages: [
        {
          speaker: "Ronja",
          text: `<p>The alarm cuts through the silence at exactly six. Ronja reaches for her phone, silences it, and lies still for a moment, watching the first grey light trace patterns on the ceiling through the half-open blinds.</p>
<p>She thinks about the presentation she needs to give today. The numbers are solid, she tells herself, but the narrative still needs work. She's been at the <a href="https://example.com/urban-planning">urban planning office</a> for three years now, and still every pitch feels like the first.</p>
<p>The coffee machine hisses to life as she shuffles into the kitchen. Through the window, the city is just waking — a few joggers along the river, a delivery truck backing into the bakery downstairs. The smell of fresh bread drifts up.</p>
<p>She pulls on her running shoes. Twenty minutes along the Limmat before the day begins. The water is dark and calm, reflecting the amber streetlights that haven't yet switched off.</p>`,
        },
        {
          speaker: "Daniel",
          text: `<p>Daniel's alarm never goes off because he never set one. He's been awake since five, reading a paper on <a href="https://example.com/distributed-energy">distributed energy systems</a> that he found the night before. The margins of his notebook are filling up with small, precise annotations.</p>
<p>He lives alone in a two-room apartment in Wiedikon, the kind of place where the radiator clanks at odd hours and the neighbour's cat sometimes appears on the windowsill. He doesn't mind. The quiet suits the kind of thinking he does best.</p>
<p>Breakfast is two slices of dark bread with butter and a pot of black tea — the same every morning. Routine, he believes, is the scaffolding that holds creative thought in place.</p>
<p>By quarter to seven, he's already dressed. He checks the weather app — twelve degrees, overcast. Perfect walking weather.</p>`,
        },
      ],
    },

    // ─── Chapter 2: The Commute ──────────────────────────────────────────
    {
      title: "The Commute",
      time: "7.5 Uhr",
      pages: [
        {
          speaker: "Daniel",
          text: `<p>The tram arrives two minutes late, which Daniel notes with the mild displeasure of someone who has optimised every other part of his morning. He finds a window seat near the back and opens his notebook again.</p>
<p>The city scrolls by outside — construction scaffolding, a new café where the bookshop used to be, schoolchildren weaving between pedestrians. He barely notices. His mind is still on the energy paper, specifically a passage about <a href="https://example.com/microgrids">community microgrids</a> in rural Portugal.</p>
<p>Could something like that work here? The topology is different, the regulations more rigid. But the principle — decentralised, community-owned — that resonates.</p>
<p>He scribbles a note: <em>Talk to Martina about pilot feasibility.</em></p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>Ronja's bike cuts through the morning air along Langstrasse, past the shuttered clubs and the early risers queuing at the Turkish bakery. She knows every pothole, every traffic light cycle on this route.</p>
<p>She uses the ride to rehearse. <em>The quarter we're proposing would reduce car dependency by forty percent.</em> No — too aggressive for the opening. Start with the human angle. <em>Imagine a neighbourhood where children walk to school without crossing a four-lane road.</em></p>
<p>Better. She adjusts her grip on the handlebars and turns onto the bridge. Below, the river is the colour of wet slate.</p>
<p>At the office bike rack she locks up, straightens her jacket, and notices a message from her colleague Lena: <a href="https://example.com/meeting-notes">the committee moved the meeting up by an hour</a>. Wonderful.</p>`,
        },
      ],
    },

    // ─── Chapter 3: Arrival ──────────────────────────────────────────────
    {
      title: "Arrival",
      time: "9 Uhr",
      coverUrl: "https://picsum.photos/seed/office-morning/800/500",
      pages: [
        {
          speaker: "Ronja",
          text: `<p>The office smells like someone else's reheated pasta and fresh printer toner. Ronja drops her bag at her desk, opens her laptop, and immediately regrets not checking email during the ride.</p>
<p>Fourteen new messages. Three are from the same person — Thomas from the transport department — each one more urgent than the last. She scans them: <em>budget concerns, timeline slipping, stakeholder pushback.</em></p>
<p>She takes a breath. This is the part of the job no one talks about in architecture school. Not the design, not the vision — the endless negotiation with people who see a spreadsheet where she sees a neighbourhood.</p>
<p>Lena appears with two coffees. "You saw the time change?" Ronja nods. "I've got forty minutes to rewrite the opening." Lena sets down the cup. "You'll manage. You always do."</p>`,
        },
        {
          speaker: "Daniel",
          text: `<p>The research institute sits on a quiet street behind the university, a converted villa with creaking wooden floors and rooms that are either too hot or too cold. Daniel has worked here for five years, first as a postdoc and now as a project lead.</p>
<p>His team is small — four researchers, a lab technician, and a rotating cast of master's students who stay for a semester and leave behind half-finished code. He's learned to build systems that don't depend on any single person.</p>
<p>This morning there's a message from the <a href="https://example.com/energy-fund">federal energy fund</a>: their grant proposal has advanced to the second round. It's not a yes, but it's not a no. Daniel allows himself a small, private smile.</p>
<p>He opens the simulation software and picks up where he left off yesterday.</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>The meeting room is too bright and too warm. Ronja stands at the front with her slides projected behind her, facing a semicircle of officials who look like they'd rather be somewhere else.</p>
<p>She begins with the human angle, as planned. A photograph of the current street — cars, noise barriers, a playground pressed against a parking garage. Then the rendering: trees, wider pavements, a small market square.</p>
<p>"This isn't about aesthetics," she says. "It's about how people live." She clicks to the next slide. "Residents in car-reduced quarters report <a href="https://example.com/health-study">thirty percent higher satisfaction</a> with their neighbourhood."</p>
<p>Thomas from transport raises his hand. She braces herself. But what he says surprises her: "Can you send me those numbers? I might be able to use them for something."</p>`,
        },
      ],
    },

    // ─── Chapter 4: Coffee Break ─────────────────────────────────────────
    {
      title: "Coffee Break",
      time: "10.5 Uhr",
      pages: [
        {
          speaker: "Daniel",
          text: `<p>Daniel takes his coffee outside, into the small courtyard garden behind the institute. There's a wooden bench under a linden tree that he's claimed as his own through years of quiet occupation. Nobody else seems to want it.</p>
<p>He checks his phone — a rare concession to distraction. There's a message from his sister in Basel: a photo of his niece's first drawing, a wobbly circle with two dots that is apparently a cat. He saves it.</p>
<p>The grant news is still settling in. If they get the funding, it means two more years of work, a new hire, maybe even a small pilot project. If they don't — well. He's been through that before.</p>
<p>A blackbird lands on the bench beside him, tilts its head, and flies off. Daniel finishes his coffee and goes back inside. The simulation won't debug itself.</p>`,
        },
      ],
    },

    // ─── Chapter 5: Lunch ────────────────────────────────────────────────
    {
      title: "Lunch",
      time: "12.5 Uhr",
      coverUrl: "https://picsum.photos/seed/city-lunch/800/500",
      pages: [
        {
          speaker: "Ronja",
          text: `<p>Lena insists on the Vietnamese place around the corner, the one with the plastic chairs and the soup that could cure anything. Ronja doesn't argue. After the meeting, she needs something warm and uncomplicated.</p>
<p>"It went well," Lena says, chopsticks poised. "Thomas actually listened." Ronja stirs her pho. "He listened because the numbers support us. If they didn't, he'd have torn it apart."</p>
<p>They eat in comfortable silence for a while. Through the window, the lunchtime crowd flows past — students, office workers, a woman pushing a stroller and talking animatedly into her phone.</p>
<p>"Sometimes I wonder," Ronja says, "if any of this actually changes anything. We redesign a street, plant some trees, and then what? The same cars just go somewhere else."</p>`,
        },
        {
          speaker: "Daniel",
          text: `<p>Daniel eats at his desk, which he knows is a bad habit. A container of leftover lentil soup from Sunday, a piece of bread that's seen better days. He's not thinking about the food.</p>
<p>The simulation has thrown up an anomaly — a feedback loop in the grid model that shouldn't be there. He's been tracing it for an hour, eliminating variables one by one, and he's close to finding the source.</p>
<p>This is the part he loves: the puzzle, the slow narrowing of possibilities until the answer reveals itself. It's the same satisfaction he imagines <a href="https://example.com/detective-fiction">detective novelists</a> feel, except his mysteries are made of differential equations.</p>
<p>He takes a bite of bread without looking and keeps scrolling through the data logs.</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>"It changes more than you think," Lena says, refilling their water glasses. "Remember the Nordquartier project? Three years later, there are kids playing in that square every afternoon. That didn't happen by accident."</p>
<p>Ronja knows she's right. But there's a gap between knowing and feeling it. The work is slow, the bureaucracy relentless, and every small victory is followed by a new set of objections from someone with a different spreadsheet.</p>
<p>She picks up the bill. "My turn." Lena doesn't protest. They have a system.</p>
<p>Outside, the sun has broken through for the first time today. Ronja tilts her face up for a moment, feels the warmth on her eyelids. "Okay," she says. "Back to it." She reads a post from the <a href="https://example.com/urbanist-blog">urbanist collective</a> on her phone as they walk back.</p>`,
        },
        {
          speaker: "Daniel",
          text: `<p>Found it. The error was in the boundary conditions — a sign flip introduced three weeks ago when he refactored the thermal model. A tiny mistake with cascading consequences. He fixes it in one line and reruns the simulation.</p>
<p>The results are clean now. The model shows what he expected: a distributed system outperforms the centralised grid by twelve percent in resilience metrics, though the upfront cost is higher. The trade-off is real, but the long-term case is strong.</p>
<p>He leans back and stretches. His neck has been locked in the same position for hours. Through the window, he notices the sun has come out. He didn't see it happen.</p>
<p>He writes a quick message to Martina: <em>Model is working. Results look promising. Let's talk tomorrow.</em></p>`,
        },
      ],
    },

    // ─── Chapter 6: Afternoon ────────────────────────────────────────────
    {
      title: "Afternoon",
      time: "14 Uhr",
      pages: [
        {
          speaker: "Daniel",
          text: `<p>The afternoon seminar is sparsely attended — seven people in a room designed for forty. A visiting researcher from <a href="https://example.com/eth-lab">ETH</a> presents work on hydrogen storage that Daniel finds genuinely interesting, even if the methodology has gaps.</p>
<p>He asks a question during the Q&A, something about the scalability assumptions. The presenter pauses, considers it, and says, "That's a good point. I don't have a complete answer yet." Daniel appreciates the honesty. In his experience, the best researchers are the ones comfortable with not knowing.</p>
<p>After the talk, they exchange cards. The presenter — her name is Yuki — mentions she's looking for collaboration partners. "We might have overlapping interests," Daniel says carefully. He doesn't like to overcommit.</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>The afternoon is a blur of emails, revisions, and one call with a community group from the pilot neighbourhood. They have concerns about the construction timeline — it's disrupting the local market, and two shop owners are threatening to leave.</p>
<p>Ronja listens, takes notes, promises to raise it with the project manager. She knows these aren't small problems. A neighbourhood plan that displaces the people it's meant to serve is a failure, regardless of how beautiful the renderings look.</p>
<p>She pulls up the <a href="https://example.com/community-engagement">community engagement framework</a> she drafted last year and starts adapting it. More regular updates, a dedicated liaison, maybe a temporary market space during construction.</p>
<p>It's unglamorous work. Nobody will put it in a magazine. But it's the work that matters.</p>`,
        },
      ],
    },

    // ─── Chapter 7: The Encounter ────────────────────────────────────────
    {
      title: "The Encounter",
      time: "16 Uhr",
      coverUrl: "https://picsum.photos/seed/bridge-evening/800/500",
      pages: [
        {
          speaker: "Ronja",
          text: `<p>She leaves the office early — or what counts as early, which is only thirty minutes past her contracted hours. The sun is low and golden, throwing long shadows across the pavement. She decides to walk home instead of cycling.</p>
<p>On the bridge, she stops. Below, a group of teenagers is sitting on the riverbank, passing around a speaker playing something she doesn't recognise. A heron stands motionless in the shallows, indifferent to the music.</p>
<p>This, she thinks, is what it's about. Not the renderings, not the committee meetings — this. People using space. Being in it. The city as something lived, not just planned.</p>
<p>She leans on the railing and watches for a while. A man with a notebook walks past her, heading the other direction.</p>`,
        },
        {
          speaker: "Daniel",
          text: `<p>Daniel walks home along the river, as he does most evenings. The route is longer than necessary, but he likes the transition — the slow unwinding of the day's thoughts as the city softens around him.</p>
<p>On the bridge, he passes a woman leaning on the railing, looking down at the water. He notices her briefly — short hair, a canvas bag over one shoulder — and then she's behind him.</p>
<p>He's thinking about Yuki's presentation, about hydrogen and storage and the gap between laboratory conditions and the real world. There's always a gap. The trick is building bridges across it — not pretending it isn't there.</p>
<p>He stops at the small <a href="https://example.com/bookshop">bookshop on Josefstrasse</a> and picks up a novel he ordered last week. The owner knows him by name. "Something light this time?" she asks. He smiles. "Never."</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>Her phone buzzes as she reaches the far side of the bridge. It's Thomas again — but this time the message is different. <em>Shared your slides with the director. She wants to discuss expanding the pilot area.</em></p>
<p>Ronja reads it twice. Then a third time. Expanding the pilot area. That's not just approval — that's ambition. Someone higher up saw the same thing she sees.</p>
<p>She types a reply — <em>That's great news. Let's set up a meeting.</em> — and puts her phone away. She doesn't want to overthink it. Good news, in her experience, has a way of shrinking if you examine it too closely.</p>
<p>The evening air smells like rain. She walks faster, not because she minds getting wet, but because she wants to be home. She wants to sit on her balcony with a glass of wine and let this feeling settle. Read the latest on the <a href="https://example.com/15-min-city">fifteen-minute city movement</a>, maybe.</p>`,
        },
      ],
    },

    // ─── Chapter 8: Evening ──────────────────────────────────────────────
    {
      title: "Evening",
      time: "19 Uhr",
      pages: [
        {
          speaker: "Daniel",
          text: `<p>Dinner is pasta with whatever vegetables are about to go off — courgette, a few cherry tomatoes, half an onion. Daniel cooks with the radio on, a habit inherited from his mother, who believed that kitchens should never be silent.</p>
<p>He eats at the small table by the window, the novel propped open beside his plate. It's a story about a cartographer in the eighteenth century, mapping coastlines that keep shifting. He finds it oddly relevant.</p>
<p>Afterwards, he washes up and sits on the sofa with his laptop. Not to work — he has a rule about that — but to read. A long article about <a href="https://example.com/climate-adaptation">climate adaptation in Dutch cities</a>, sent by a colleague. The Dutch, he thinks, have always understood that you can't fight water. You negotiate with it.</p>
<p>The neighbour's cat appears on the windowsill. Daniel opens the window an inch. They regard each other in silence.</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>The balcony is barely big enough for one chair and a small table, but in the evening light, with the rooftops spread out below, it feels like enough. Ronja sits with her wine and watches the city shift gears — the daytime hum fading into something softer, more scattered.</p>
<p>She calls her mother in Bern. They talk about nothing in particular — the garden, a cousin's wedding, a recipe for Zopf that neither of them will ever make. It's comforting in the way that unimportant conversations sometimes are.</p>
<p>"How's work?" her mother asks. "Getting somewhere," Ronja says. She doesn't elaborate. Her mother, a retired teacher, has never fully understood what urban planning means, but she's always believed in it.</p>
<p>After they hang up, Ronja stays outside. A <a href="https://example.com/bat-conservation">bat</a> flickers past, impossibly fast. The first drops of rain begin to fall. She doesn't move.</p>`,
        },
      ],
    },

    // ─── Chapter 9: Night ────────────────────────────────────────────────
    {
      title: "Night",
      time: "22 Uhr",
      coverUrl: "https://picsum.photos/seed/night-city/800/500",
      pages: [
        {
          speaker: "Daniel",
          text: `<p>Before bed, Daniel stands at the window for a long moment. The street below is quiet — a cyclist, a couple walking arm in arm, the orange glow of the Kebab shop that never seems to close. Rain has slicked the pavement, and the reflections of the streetlights look like they belong to a different, submerged city.</p>
<p>He thinks about the day — the grant, the simulation, the conversation with Yuki. Small steps. That's how it always goes. You don't solve a problem in a day; you narrow the space of uncertainty until an answer begins to emerge.</p>
<p>He closes his notebook, places it on the nightstand, and turns off the light. Tomorrow, he'll start writing the second-round proposal. Tonight, he lets his mind go quiet.</p>
<p>Somewhere in the building, a door closes softly. The radiator clanks once and falls silent.</p>`,
        },
        {
          speaker: "Ronja",
          text: `<p>Ronja dries her hair after a shower and climbs into bed with her laptop. She rereads Thomas's message one more time, then closes the email app. Enough.</p>
<p>She opens a <a href="https://example.com/architecture-podcast">podcast about urban architecture in Copenhagen</a> — the kind of thing she listens to when she wants to remember why she chose this work. A Danish planner talks about streets that were reclaimed from cars in the 1960s. "Everyone said it would kill the city," the planner says. "Instead, it brought it to life."</p>
<p>The rain is steady now, drumming against the window in irregular patterns. Ronja lets the podcast play, her eyes half-closed.</p>
<p>Tomorrow there will be more emails, more negotiations, more compromises. But also: an expanding pilot area, a director who sees what she sees, a city that — slowly, unevenly, imperfectly — is changing.</p>
<p>She falls asleep with the light still on.</p>`,
        },
      ],
    },
  ],
};
