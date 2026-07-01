# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dynamic-components.spec.ts >> /articles/2026/04/01/such-ein-buch
- Location: tests/dynamic-components.spec.ts:8:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - link "Anmelden Anmelden" [ref=e6] [cursor=pointer]:
          - /url: /anmelden
          - img "Anmelden" [ref=e7]
          - generic [ref=e9]: Anmelden
        - link [ref=e11] [cursor=pointer]:
          - /url: /
          - img [ref=e12]
      - separator [ref=e16]
    - article [ref=e19]:
      - heading "Such ein Buch" [level=1] [ref=e20]
      - heading "Wir haben wieder literarische Ostereier versteckt. Eine Entdeckungs-Tour in fünf Stationen." [level=3] [ref=e21]
      - paragraph [ref=e22]:
        - text: Von
        - link "Daniel Graf" [ref=e23] [cursor=pointer]:
          - /url: /~186e0a00-3ab5-4246-87a5-6bc44d6fca95
        - text: (Text) und Kam Tang (Illustration), 01.04.2026
      - link "Edit in Studio" [ref=e25] [cursor=pointer]:
        - /url: http://localhost:3333/structure/article;d274da78-53a0-5275-83e3-ac1f788cc072
        - img [ref=e26]
      - heading "1" [level=2] [ref=e29]
      - paragraph [ref=e30]:
        - text: Die Vergabe von Literaturpreisen ist notorisch umstritten, aber manchmal fühlt sich ein Jury-Entscheid auch einfach goldrichtig an. Bei «
        - link "Goldstrand" [ref=e31] [cursor=pointer]:
          - /url: https://www.fischerverlage.de/buch/katerina-poladjan-goldstrand-9783103971767?utm_source=google&utm_medium=search&utm_campaign=SFI_Novikampagne2026-M%C3%A4rz_SFischer_DIV_Google&utm_content=responsiv&gad_source=1&gad_campaignid=23427324714&gclid=CjwKCAjwspPOBhB9EiwATFbi5DEfYxcebb4Xx6paMx7N7ON_XIzbkL7BxgxqkuhdsTe-f3umlOnWwBoCYsYQAvD_BwE
        - text: » zum Beispiel, dem Roman, für den Katerina Poladjan kürzlich den renommierten Leipziger Buchpreis erhielt.
      - paragraph [ref=e32]: Da liegt also Eli, ein in die Jahre gekommener Filmregisseur, in Rom bei seiner Therapeutin auf der Couch und fabuliert. Was er der «Dottoressa» lebhaft ausmalt, sind Filmszenen, die nach und nach immer deutlicher als Schlüsselmomente seiner Familiengeschichte lesbar werden.
      - paragraph [ref=e33]: "Wie Lew 1922 in Odessa mit Tochter Vera und Sohn Felix ein Schiff Richtung Konstantinopel besteigt. Wie Vera abends zum letzten Mal an Deck gesehen wird und wohl in der Nacht über die Reling gesprungen sein muss. Wie Lew, der die Leiche seiner Tochter finden will, mit seinem Jungen in einer kargen Hütte in der Nähe von Warna an der bulgarischen Küste landet, wo Felix Jahrzehnte später als Architekt jenen Touristenort namens «Goldstrand» mitentwirft, der ab 1956 als «Musterbeispiel sozialistischer Erholungsarchitektur» dienen soll. Und wo ein One-Night-Stand zwischen Felix und einer italienischen Genossin auf Kurzbesuch dazu führt, dass neun Monate später in Rom ein Junge namens Eli zur Welt kommt – und im Haushalt der Grosseltern aufwächst, wo der Nonno noch immer seine faschistischen Devotionalien ausbreitet. Die eigene Tochter, Elis Mutter, hat der Patriarch verstossen: aus politischen Gründen und weil sie unehelich schwanger wurde."
      - paragraph [ref=e34]:
        - text: "Dass Eli die gemeinsame Zukunft mit seiner Lebensliebe Jenny in den Sand setzen wird und vor lauter Kunstdrang versäumt, seiner Tochter ein guter Vater zu sein, verbindet Poladjans filmischen Roman tatsächlich mit dem Gegenwartskino: mit Joachim Triers grossartigem «"
        - link "Sentimental Value" [ref=e35] [cursor=pointer]:
          - /url: https://frenetic.ch/de/katalog/detail/sentimental-value-1288/
        - text: ». Doch Poladjans Hauptthema ist ein anderes. Sie erkundet, wie das 20. Jahrhundert mit seinen totalitären Systemen und Ideologien ganze Familiengeschichten und individuelle Lebensläufe formt.
      - paragraph [ref=e36]: Andere erzählen eine solche Mischung aus Mehrgenerationenporträt und Geschichtspanorama in einem Monumentalroman; Poladjan hingegen reichen 160 Seiten. Die allerdings sind so dicht bepackt mit Einfällen, Wendungen und grandios tragikomischen Dialogen, dass man sich das Mosaik von Elis Leben mit detektivischer Neugier zusammensetzt, hochaktiv und scheinbar anstrengungslos.
      - paragraph [ref=e37]: Und jedes Mal, wenn die «Dottoressa» Eli ihr unerbittliches «Unsere Zeit ist um» entgegenhält, ist man froh, dass das noch nicht für die Lektüre gilt.
      - generic [ref=e42]:
        - paragraph [ref=e43]: "Und jetzt Sie – einfach auf den passenden Button klicken: Selber lesen? Verschenken? Weitersuchen?"
        - generic [ref=e44]:
          - generic [ref=e45] [cursor=pointer]: MEIN
          - generic [ref=e46] [cursor=pointer]: DEIN
          - generic [ref=e47] [cursor=pointer]: NEIN
        - paragraph [ref=e48]
      - heading "2" [level=2] [ref=e49]
      - paragraph [ref=e50]:
        - text: «Wer von Euch kann ein Rad?» Für die Kunstturnerinnen, von denen Son Lewandowski in
        - link "ihrem Debütroman" [ref=e51] [cursor=pointer]:
          - /url: https://www.klett-cotta.de/produkt/son-lewandowski-die-routinen-9783608967166-t-9356
        - text: erzählt, beginnt mit dieser Frage das Ende ihrer Kindheit.
      - paragraph [ref=e54]: Ich weiss nicht mehr, wann ich aufgehört habe zu spielen. (…) Ich war ein Kind, das ein Rad schlug, bis es nicht mehr konnte.
      - paragraph [ref=e55]: «Die Routinen» ist ein schmerzhaftes, dringliches und literarisch aussergewöhnliches Buch. Es handelt von Missbrauch im Leistungssport. Von der Zurichtung weiblicher Körper, von Drill, Demütigung, Hungerzwang und Erniedrigung, von misogynen Strukturen und von sexualisierter Gewalt. Und es erzählt von all dem in einer glasklaren Sprache, die buchstäblich gegen alle Verbiegungen anschreibt.
      - paragraph [ref=e56]: "«Verdreht» ist eine der Schlüsselvokabeln dieses Romans, denn verdreht ist in der Welt, die Lewandowski schildert, das Allermeiste: die Körperhaltung, die Gelenke, die Wahrheiten und die Ideale. «Perfektion» wird hier zu einem Horrorwort. Was die Trainerinnen als «Selbstbeherrschung» ausgeben, verlangt in Wirklichkeit, für die Show die eigenen Schmerzen, ja überhaupt Emotionen zu verleugnen. Und letztlich den eigenen Körper als Feind, als lästiges Hemmnis gegen die Makellosigkeit zu verstehen:"
      - paragraph [ref=e59]: Sich die Scham aufreissen. Auf einem Treppchen stehen. Sich die Schulter auskugeln. Einen Pokal halten. Die Gelenke zerdehnt, der Rücken zersprungen, die Hände zerrissen und nirgendwo Zorn.
      - paragraph [ref=e60]: "Son Lewandowski hat ihren Plot um zwei Hauptfiguren aufgebaut: die 15-jährige Izzy, die bei den Europameisterschaften schwer stürzt. Und die doppelt so alte Amik, die von ihrem Trainer ausgebootet wurde und nun an Izzys Spitalbett sitzend die ganze Geschichte erzählt."
      - paragraph [ref=e61]:
        - text: In diesen fiktiven Rahmen hat Lewandowski zahlreiche essayistische Passagen mit realen Beispielen aus der Sportgeschichte eingeflochten, einschliesslich Fällen von Psychoterror, sexuellen Übergriffen und Vergewaltigung. Und sie erzählt am Beispiel der rumänischen Turnerin Nadia Comăneci, die einst im Alter von 14 Jahren eine
        - emphasis [ref=e62]: perfect ten
        - text: – also die legendäre Spitzennote – erreichte, wie die Sportlerinnen nicht nur unter den Blicken des Publikums zum Objekt gemacht, sondern mitunter auch von staatlicher Propaganda instrumentalisiert werden.
      - paragraph [ref=e63]: Demgegenüber lenkt Lewandowski den Blick auf «die seilwunden Handgelenke, die aufgeschlagenen Fersen, die gerissenen Hände» – aber auch auf Momente der Solidarität inmitten eines auf Konkurrenz gebauten Systems.
      - generic [ref=e68]:
        - paragraph
        - generic [ref=e69]:
          - generic [ref=e70] [cursor=pointer]: MEIN
          - generic [ref=e71] [cursor=pointer]: DEIN
          - generic [ref=e72] [cursor=pointer]: NEIN
        - paragraph [ref=e73]
      - heading "3" [level=2] [ref=e74]
      - paragraph [ref=e75]:
        - text: Es scheint, als erlebe gerade ausgerechnet jene Prosagattung einen stillen Boom, die es im
        - link "romanfixierten Buchmarkt" [ref=e76] [cursor=pointer]:
          - /url: /2024/04/11/ende-der-roman-versessenheit
        - text: "der Gegenwart traditionell schwer hat: die Kurzgeschichte. Natürlich, wenn ein Autor vom Kaliber Salman Rushdie einen"
        - link "Band mit Erzählungen" [ref=e77] [cursor=pointer]:
          - /url: https://www.penguin.de/buecher/salman-rushdie-die-elfte-stunde/buch/9783328604686
        - text: "veröffentlicht und dafür Aufmerksamkeit erhält, besagt das noch nicht viel: Von längst etablierten Romanautoren hat man schon immer zwischendurch mal einen Erzählungsband goutiert – so als Nebenwerk."
      - paragraph [ref=e78]:
        - text: Aber in letzter Zeit sind Autorinnen wie
        - link "Joy Williams" [ref=e79] [cursor=pointer]:
          - /url: https://www.dtv.de/buch/stories-2-28486
        - text: ","
        - link "Lydia Davis" [ref=e80] [cursor=pointer]:
          - /url: https://www.droschl.com/buch/unsere-fremden/
        - text: ","
        - link "Bora Chung" [ref=e81] [cursor=pointer]:
          - /url: https://www.culturbooks.de/portfolio/bora-chung-dein-utopia/
        - text: oder
        - link "Zach Williams" [ref=e82] [cursor=pointer]:
          - /url: https://www.dtv.de/buch/es-werden-schoene-tage-kommen-28461
        - text: nicht trotz, sondern wegen ihrer Kurzgeschichten Kult geworden. Grosse Preise werden, wie zuletzt bei
        - link "Miljenko Jergović" [ref=e83] [cursor=pointer]:
          - /url: /2026/03/16/der-chronist-von-sarajevo
        - text: ", auch mal für einen Erzählband vergeben. Auffallend viele Erzählerinnen des 20. Jahrhunderts werden derzeit wieder- oder zum ersten Mal entdeckt: von"
        - link "Saki" [ref=e84] [cursor=pointer]:
          - /url: https://doerlemann.ch/produkt/nie-eine-langweilige-zeile/
        - text: über
        - link "Pawel Salzman" [ref=e85] [cursor=pointer]:
          - /url: https://www.matthes-seitz-berlin.de/buch/apfelschimmel.html?lid=1
        - text: bis zu
        - link "Harper Lee" [ref=e86] [cursor=pointer]:
          - /url: https://www.penguin.de/buecher/harper-lee-das-land-der-suessen-ewigkeit/buch/9783328604624
        - text: ","
        - link "Stig Dagerman" [ref=e87] [cursor=pointer]:
          - /url: https://guggolz-verlag.de/buecher/unser-naechtlicher-badeort
        - text: ","
        - link "Alma Hirschel" [ref=e88] [cursor=pointer]:
          - /url: https://www.wallstein-verlag.de/9783835358775-ueberleben.html
        - text: oder
        - link "Walter Vogt" [ref=e89] [cursor=pointer]:
          - /url: https://www.wallstein-verlag.de/9783835358164-zwei-maenner-in-einem-raum.html
        - text: . Und Gegenwartsautorinnen wie
        - link "Lee Yuri" [ref=e90] [cursor=pointer]:
          - /url: https://kanon-verlag.de/shop/storys/lee-yuri-broccoli-punch/
        - text: ","
        - link "Mariana Enriquez" [ref=e91] [cursor=pointer]:
          - /url: https://www.fischerverlage.de/buch/mariana-enriquez-grelles-licht-fuer-darke-leute-9783758700286
        - text: oder
        - link "Samanta Schweblin" [ref=e92] [cursor=pointer]:
          - /url: https://www.suhrkamp.de/buch/samanta-schweblin-das-gute-uebel-t-9783518431382
        - text: geben der Gattung ganz neuen Drive oder nutzen sie, wie die Iranerin
        - link "Aliyeh Ataei" [ref=e93] [cursor=pointer]:
          - /url: https://www.penguin.de/buecher/aliyeh-ataei-im-land-der-vergessenen/buch/9783630877815
        - text: ", zur Dokumentation des Widerstands."
      - paragraph [ref=e94]:
        - text: Auch die schottische Romanautorin A. L. Kennedy ist eine glänzende Short-Story-Schreiberin. Davon kann man sich schon länger überzeugen, besonders eindrücklich aber in der aktuellen Sammlung «Alle freuen sich», die im Zürcher
        - link "Geparden-Verlag" [ref=e95] [cursor=pointer]:
          - /url: https://www.gepardenverlag.ch/alle-titel-a-z/
        - text: erschienen ist und bei Ingo Herzke in bewährten Übersetzerhänden lag.
      - paragraph [ref=e96]: "Mit scharfzüngigem Humor und schneidenden Charakterstudien legt Kennedy darin politische Stimmungen der Gegenwart frei: Abstiegsängste, aggressiv kriselnde Männlichkeit, die falschen Versprechen des Kapitalismus. Doch was für eine versierte Erzählerin Kennedy ist, zeigt vielleicht am eindrücklichsten eine Erzählung namens «Unerwidert», im Ton wieder völlig anders nuanciert."
      - paragraph [ref=e97]: «Ich habe zweimal auf einem Trümmergrundstück gewohnt, und beide Male wusste ich es. Obwohl es mir niemand erzählt hatte, denn das machen die Leute nicht.» So fängt der Erzähler an, spricht alsbald von Armut und vom «Millionärs-London, wo alles Geld nach oben fliesst», davon, dass London «immer noch von den alten Bomben bebt», wie das «Lazarus-Haus», in dem er lebt.
      - paragraph [ref=e98]: "Es ist eine Geistererzählung der eigenen Art: eine, in der die reale Geschichte von Zweitem Weltkrieg und Holocaust durch die Häuser spukt. Und im scheinbar kindlich-naiven Ton des Erzählers werden die Traumata der Überlebenden hörbar."
      - paragraph [ref=e99]: «Kriege gehen nie ganz weg», sagt er einmal, «das wusste ich schon, als ich klein war.»
      - generic [ref=e104]:
        - paragraph
        - generic [ref=e105]:
          - generic [ref=e106] [cursor=pointer]: MEIN
          - generic [ref=e107] [cursor=pointer]: DEIN
          - generic [ref=e108] [cursor=pointer]: NEIN
        - paragraph [ref=e109]
      - heading "4" [level=2] [ref=e110]
      - paragraph [ref=e111]:
        - text: «Der beste Schriftsteller seiner Generation.» Und das von keiner geringeren Adresse als der «New York Times». Für jeden Verlag ist so ein Satz natürlich der Traum von einem
        - emphasis [ref=e112]: blurb,
        - text: also einem werbetauglichen Zitat, und so prangt das Zitat auch gross in der Suhrkamp-Vorschau zum neuen Buch des US-Schriftstellers Ben Lerner. Wobei die «New York Times» nicht
        - emphasis [ref=e113]: «best»,
        - text: sondern
        - emphasis [ref=e114]: «most talented»
        - link "geschrieben hatte" [ref=e115] [cursor=pointer]:
          - /url: https://www.nytimes.com/interactive/2019/10/08/magazine/ben-lerner-topeka-school.html
        - text: ", was ja doch nicht ganz dasselbe ist."
      - paragraph [ref=e116]: "So oder so: Vielleicht sollte man solch unsinnigen Weltranglisten-Sprech einfach mal bleiben lassen?"
      - paragraph [ref=e117]:
        - text: Es stimmt ja, Ben Lerner ist ein Ausnahmekönner, als Dichter ebenso wie als Prosaautor. Auch sein neuer, schmaler Roman «
        - link "Transkription" [ref=e118] [cursor=pointer]:
          - /url: https://www.suhrkamp.de/buch/ben-lerner-transkription-t-9783518432754
        - text: » ist wieder ein Virtuosenstück (und von Nikolaus Stingl glänzend übersetzt).
      - paragraph [ref=e119]: "Da fährt der Icherzähler nach Providence, um seinen ehemaligen Mentor Thomas, einen inzwischen 90-jährigen Guru der Kunstszene, für ein letztes Interview zu treffen. Dann der Journalisten-Albtraum: Im Hotel, kurz bevor er sich auf den Weg zu Thomas machen will, fällt ihm sein Handy ins volle Waschbecken und er steht ohne Aufnahmemöglichkeit da. Alle Läden sind zu, und «Thomas war der einzige Erwachsene ohne Smartphone, den ich kannte». Also plant er, das Gespräch als Vorbesprechung zu deklarieren –und muss dann gegenüber Thomas doch so tun, als laufe die Aufnahme bereits."
      - paragraph [ref=e120]: "Aus diesem Setting baut Lerner zunächst eine ebenso gewitzte wie skurrile Parabel über unser aller Abhängigkeit vom Netz und von digitalen Lebenshilfen. Lerner lässt sie in eine Meditation über Präsenz und Authentizität münden – nur um dann in einer Kaskade von erzählerischen Kippeffekten das Skript seiner Storyline ständig neu zu überschreiben. Traumartig-geisterhaft geht es durch unterschiedlichste erzählerische Räume: die Auswirkungen der Covid-Pandemie, die Abgründe der deutschen Geschichte, die Rituale akademischer Huldigung, Familienbande und Seelenverwandtschaften bis hin zum ganz unvermittelt eingeführten Thema Sterbehilfe."
      - paragraph [ref=e121]:
        - text: Immer wieder übrigens kommt auch die Schweiz ins Spiel, nicht zuletzt das
        - link "reale Hotel Arbez" [ref=e122] [cursor=pointer]:
          - /url: /2020/08/25/ein-bett-in-zwei-laendern
        - text: . Mitten durch dieses Hotel verläuft die Grenze zwischen Frankreich und der Schweiz – und sie verläuft zum Teil auch zwischen oberer und unterer Etage. Weshalb im Zweiten Weltkrieg, so heisst es bei Lerner, die Nazisoldaten den unteren Teil des Hotels betreten, «aber nicht zu den oberen Zimmern hinaufsteigen» konnten, wo «Max Arbez half, Juden und Mitglieder der Résistance zu verstecken».
      - paragraph [ref=e123]: Ganz zu Beginn des Romans ist einmal von Glasblumen die Rede, die jegliche Form der Erschütterung durch ein Zittern registrieren. Sie seien, so heisst es, «Aufzeichnungsinstrumente von exquisiter Empfindlichkeit». Das darf man als lernersches Schreibideal verstehen.
      - generic [ref=e128]:
        - paragraph
        - generic [ref=e129]:
          - generic [ref=e130] [cursor=pointer]: MEIN
          - generic [ref=e131] [cursor=pointer]: DEIN
          - generic [ref=e132] [cursor=pointer]: NEIN
        - paragraph [ref=e133]
      - heading "5" [level=2] [ref=e134]
      - paragraph [ref=e135]:
        - text: «Vergiss dich nicht» heisst die erste Graphic Novel der Schweizer Künstlerin Lika Nüssli. 2018 ist der Band im kleinen
        - link "Vexer-Verlag" [ref=e136] [cursor=pointer]:
          - /url: https://vexer.ch/products/vergiss-dich-nicht
        - text: erschienen, war zuletzt vergriffen – und ist soeben bei der Edition Moderne
        - link "neu aufgelegt" [ref=e137] [cursor=pointer]:
          - /url: https://www.editionmoderne.ch/buch/vergiss-dich-nicht/
        - text: worden. Wer diese besondere Text-Bild-Erzählung über Pflege, Demenz und das Leben im Heim noch nicht kennt, bekommt jetzt also wieder Gelegenheit.
      - paragraph [ref=e138]: Der Ausgangspunkt für Nüssli war biografisch. Und so beginnt das Buch als Brief an die eigene Mutter. Wo der Tochter die Worte ausgehen, kommen ihr die Bilder zu Hilfe. Zugleich wirken die Illustrationen wie eine Erinnerungsstütze für die Mutter, eine andere Mitteilungsform in einer Lebenssituation, in der beide ihre je eigenen Sprachlosigkeiten durchzustehen haben. Text und Bild finden erst mit der Zeit zusammen, treten wieder auseinander, erzählen die Geschichte mal im Wechsel, mal kombiniert in der Grammatik der Worte und der Zeichenkunst.
      - paragraph [ref=e139]: "Es ist der typische Nüssli-Stil, der im Verschiedenen verwandte Strukturen erkennt: schraffierte Flächen, die mal Haarschopf, mal Gebirgslandschaft, mal Strickwolle sein können."
      - paragraph [ref=e140]: Doch es bleibt nicht beim Erinnern der Geschichte zwischen Mutter und Tochter. Auch der Plot findet assoziativ seine eigene Dramaturgie. Nüssli fängt Alltagsszenen aus dem Seniorenheim ein, spürt einem veränderten Zeitempfinden und sich wandelnden Wahrnehmungsmustern nach, erzählt ohne Sentimentalität und Verklärung.
      - paragraph [ref=e141]: "Ihr Blick verbleibt nicht in der Familie, sondern gilt dem Kosmos des Heims und all jenen, die darin eine vom Zufall geformte Lebensgemeinschaft bilden: Pflegerinnen und Gepflegte. Menschen, die von weit her oder ganz aus der Nähe an diesen Ort kamen, der Heim heisst, unabhängig davon, ob er sich auch so anfühlt."
      - generic [ref=e146]:
        - paragraph
        - generic [ref=e147]:
          - generic [ref=e148] [cursor=pointer]: MEIN
          - generic [ref=e149] [cursor=pointer]: DEIN
          - generic [ref=e150] [cursor=pointer]: NEIN
        - paragraph [ref=e151]
      - heading "Apropos Vergessen …" [level=2] [ref=e152]
      - paragraph [ref=e153]: "In diesem Oster-Parcours ist eine Lieblingsgattung deutlich zu kurz gekommen: die Lyrik."
      - paragraph [ref=e154]:
        - text: "Wenn Sie also bislang nicht fündig geworden sind, aber für sich oder einen lieben Menschen ein besonderes Buchpaket schnüren wollen, seien fürs Einpacken nachdrücklich empfohlen:"
        - link "Juliane Liebert" [ref=e155] [cursor=pointer]:
          - /url: https://www.suhrkamp.de/buch/juliane-liebert-moerderballaden-t-9783518432518
        - text: ","
        - link "Ulf Stolterfoht" [ref=e156] [cursor=pointer]:
          - /url: https://kookbooks.de/products/ulf-stolterfoht-ruckkehr-von-krahe-abenteuergedicht
        - text: ","
        - link "Yevgeniy Breyger" [ref=e157] [cursor=pointer]:
          - /url: https://www.suhrkamp.de/buch/yevgeniy-breyger-hallo-niemand-t-9783518432884
        - text: ","
        - link "Veronika Zorn" [ref=e158] [cursor=pointer]:
          - /url: https://etkbooks.com/veronika-zorn/
        - text: ","
        - link "Farhad Showghi" [ref=e159] [cursor=pointer]:
          - /url: https://kookbooks.de/products/farhad-showghi-die-nahere-umgebung-gedichte
        - text: ","
        - link "Julia Cimafiejeva" [ref=e160] [cursor=pointer]:
          - /url: https://www.edition-fototapeta.eu/blutkreislauf
        - text: … Und vielleicht legen Sie ja die
        - link "neue Platte" [ref=e161] [cursor=pointer]:
          - /url: https://www.fitzgeraldrimini.ch/
        - text: von Fitzgerald & Rimini dazu.
      - heading "Von der Redaktion empfohlen" [level=3] [ref=e164]
      - generic [ref=e165]:
        - generic [ref=e166]:
          - heading "Der Chronist von Sarajevo" [level=4] [ref=e167]:
            - link "Der Chronist von Sarajevo" [ref=e168] [cursor=pointer]:
              - /url: /2026/03/16/der-chronist-von-sarajevo
          - paragraph [ref=e169]: Der Schriftsteller Miljenko Jergović hat sein unvergleichliches Werk der Geschichte Ex-Jugoslawiens gewidmet, die voller Brüche und Gewalt ist. Nun erhält er den Leipziger Buchpreis zur Europäischen Verständigung.
          - paragraph [ref=e170]: Von Alida Bremer
        - generic [ref=e171]:
          - heading "Die Macht der Steinzeitfrau" [level=4] [ref=e172]:
            - link "Die Macht der Steinzeitfrau" [ref=e173] [cursor=pointer]:
              - /url: /2025/07/30/die-macht-der-steinzeitfrau
          - paragraph [ref=e174]: Die Zeichnerin Ulli Lust unternimmt in «Die Frau als Mensch» eine Reise zu den Ursprüngen menschlicher Gesellschaften. Der Comic ist so genial, dass er Sachbuch des Jahres wurde.
          - paragraph [ref=e175]: Von Valeria Heintges
        - generic [ref=e176]:
          - heading "Ende der Roman-Versessenheit" [level=4] [ref=e177]:
            - link "Ende der Roman-Versessenheit" [ref=e178] [cursor=pointer]:
              - /url: /2024/04/11/ende-der-roman-versessenheit
          - paragraph [ref=e179]: Nein, der Roman ist immer noch nicht tot. Aber die Erneuerung der Erzählliteratur speist sich zunehmend aus anderen Gattungen.
          - paragraph [ref=e180]: Von Daniel Graf
    - generic [ref=e182]:
      - generic [ref=e183]:
        - link "seit 2018" [ref=e184] [cursor=pointer]:
          - /url: /
          - img [ref=e186]
          - generic [ref=e188]: seit 2018
        - generic [ref=e189]:
          - link [ref=e190] [cursor=pointer]:
            - /url: https://www.instagram.com/republikmagazin/
            - img [ref=e191]
          - link "Logo Facebook" [ref=e193] [cursor=pointer]:
            - /url: https://www.facebook.com/RepublikMagazin
            - img "Logo Facebook" [ref=e194]
          - link [ref=e196] [cursor=pointer]:
            - /url: https://bsky.app/profile/republik.ch
            - img [ref=e197]
          - link [ref=e199] [cursor=pointer]:
            - /url: https://republik.social/@republik_magazin
            - img [ref=e200]
      - separator [ref=e202]
      - generic [ref=e203]:
        - generic [ref=e204]:
          - generic [ref=e205]:
            - paragraph [ref=e206]: Mitglied werden
            - navigation [ref=e207]:
              - list [ref=e208]:
                - listitem [ref=e209]:
                  - link "Angebote" [ref=e210] [cursor=pointer]:
                    - /url: http://localhost:3000
                - listitem [ref=e211]:
                  - link "Verschenken" [ref=e212] [cursor=pointer]:
                    - /url: http://localhost:3000/geschenke
                - listitem [ref=e213]:
                  - link "Freiwilliger Beitrag" [ref=e214] [cursor=pointer]:
                    - /url: http://localhost:3000/angebot/DONATION
                - listitem [ref=e215]:
                  - link "Gutschein einlösen" [ref=e216] [cursor=pointer]:
                    - /url: /abholen
                - listitem [ref=e217]:
                  - link "Anmelden" [ref=e218] [cursor=pointer]:
                    - /url: /anmelden
          - generic [ref=e219]:
            - paragraph [ref=e220]: Republik
            - navigation [ref=e221]:
              - list [ref=e222]:
                - listitem [ref=e223]:
                  - link "Das sind wir" [ref=e224] [cursor=pointer]:
                    - /url: /about
                - listitem [ref=e225]:
                  - link "Jobs" [ref=e226] [cursor=pointer]:
                    - /url: /format/jobs
                - listitem [ref=e227]:
                  - link "Cockpit" [ref=e228] [cursor=pointer]:
                    - /url: /cockpit
                - listitem [ref=e229]:
                  - link "FAQ" [ref=e230] [cursor=pointer]:
                    - /url: /faq
                - listitem [ref=e231]:
                  - link "Project R" [ref=e232] [cursor=pointer]:
                    - /url: https://project-r.construction
          - generic [ref=e233]:
            - paragraph [ref=e234]: Community
            - navigation [ref=e235]:
              - list [ref=e236]:
                - listitem [ref=e237]:
                  - link "Veranstaltungen" [ref=e238] [cursor=pointer]:
                    - /url: /veranstaltungen
                - listitem [ref=e239]:
                  - link "Community" [ref=e240] [cursor=pointer]:
                    - /url: /community
                - listitem [ref=e241]:
                  - link "Genossenschaftsrat" [ref=e242] [cursor=pointer]:
                    - /url: /format/genossenschaftsrat
                - listitem [ref=e243]:
                  - link "Komplizin" [ref=e244] [cursor=pointer]:
                    - /url: /komplizin
                - listitem [ref=e245]:
                  - link "Etikette" [ref=e246] [cursor=pointer]:
                    - /url: /etikette
                - listitem [ref=e247]:
                  - link "Feedback" [ref=e248] [cursor=pointer]:
                    - /url: /feedback
          - generic [ref=e249]:
            - paragraph [ref=e250]: Rechtliches
            - navigation [ref=e251]:
              - list [ref=e252]:
                - listitem [ref=e253]:
                  - link "AGB" [ref=e254] [cursor=pointer]:
                    - /url: /agb
                - listitem [ref=e255]:
                  - link "Datenschutz" [ref=e256] [cursor=pointer]:
                    - /url: /datenschutz
                - listitem [ref=e257]:
                  - link "Project R Statuten" [ref=e258] [cursor=pointer]:
                    - /url: /statuten
                - listitem [ref=e259]:
                  - link "Aktionariat" [ref=e260] [cursor=pointer]:
                    - /url: /aktionariat
                - listitem [ref=e261]:
                  - link "Impressum" [ref=e262] [cursor=pointer]:
                    - /url: /impressum
        - generic [ref=e263]:
          - paragraph [ref=e264]:
            - text: Republik AG
            - text: Sihlhallenstrasse 1
            - text: 8004 Zürich
            - text: Schweiz
          - paragraph [ref=e265]:
            - link "kontakt@republik.ch" [ref=e266] [cursor=pointer]:
              - /url: mailto:kontakt@republik.ch
            - link "Medieninformationen" [ref=e267] [cursor=pointer]:
              - /url: /impressum
      - generic [ref=e268]:
        - radiogroup [ref=e270]:
          - radio [checked] [ref=e271] [cursor=pointer]:
            - img [ref=e272]
          - radio [ref=e274] [cursor=pointer]:
            - img [ref=e275]
          - radio [ref=e277] [cursor=pointer]:
            - img [ref=e278]
        - generic [ref=e280]:
          - img [ref=e281]
          - link "Der Republik Code ist Open Source" [ref=e283] [cursor=pointer]:
            - /url: https://github.com/republik/plattform
  - button "Open Next.js Dev Tools" [ref=e289] [cursor=pointer]:
    - img [ref=e290]
  - alert [ref=e293]
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | 
  3  | import usageData from '../../../dynamic-component-usage.json'
  4  | 
  5  | const slugs = usageData.map((entry) => `/articles${entry.slug}`)
  6  | 
  7  | for (const slug of slugs) {
  8  |   test(slug, async ({ page }) => {
  9  |     const errors: string[] = []
  10 | 
  11 |     page.on('pageerror', (err) => {
  12 |       errors.push(err.message)
  13 |     })
  14 | 
  15 |     page.on('console', (msg) => {
  16 |       if (msg.type() === 'error') {
  17 |         errors.push(msg.text())
  18 |       }
  19 |     })
  20 | 
  21 |     const response = await page.goto(slug)
  22 | 
  23 |     expect(response?.status(), `HTTP error for ${slug}`).toBeLessThan(400)
> 24 |     await page.waitForLoadState('networkidle')
     |                ^ Error: page.waitForLoadState: Test timeout of 30000ms exceeded.
  25 | 
  26 |     expect(errors, `JS errors on ${slug}:\n${errors.join('\n')}`).toHaveLength(
  27 |       0,
  28 |     )
  29 |   })
  30 | }
  31 | 
```