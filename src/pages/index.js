import { formatMs } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckAuthentication } from "../components/UserAuthentication/UserAuthentication";
import "./pagestyles/Home.css";
import "../components/ImageSlider/ImageSlider.css";
import { FcAutomatic } from "react-icons/fc";

var counter = 2;

const Home = () => {
  console.log("benchmark");

  useEffect(() => {
    document.getElementById("radio1").checked = true;
    setInterval(() => {
      if (document.getElementById("radio" + counter)) {
        document.getElementById("radio" + counter).checked = true;
        counter++;
        if (counter > 4) {
          counter = 1;
        }
      }
    }, 5000);
  }, []);

  return (
    <main>
      <section id="number">
        <div className="userNumber"></div>
      </section>

      <section id="main">
        <div className="main-text">
          Willkommen <br /> bei <br /> Tribute
        </div>
        <div className="main-subtext">
          <div>
            <label>Registrierte Held*innen:</label>
            <br />
            <br />
            <br />
            <label
              style={{
                padding: "5px",
                fontSize: "60px",
                fontWeight: "bold",
                color: "#1a2833",
                backgroundColor: "#12dbe2",
                borderBottomLeftRadius: 0.5,
                borderColor: "#ffffff",
                borderRadius: 1,
              }}
              id="UserCounterLabel"
            ></label>
          </div>
        </div>
      </section>

      <section id="intro">
        <div className="intro-header">
          <h2>WAS IST TRIBUTE?</h2>
        </div>

        <div className="intro-text">
          <p>
            Die "Tribute-App" ist eine Datenspende-App für Gesundheitsdaten.
          </p>
          <p>Forscher*innen und Ärzt*innen zählen auf Ihre Spende,</p>
          <p>damit wir gemeinsam, zielstrebig eine gute Lösung finden.</p>
          <p>
            Jetzt Gesundheitsdaten spenden um die Covid-19 Pandemie zu bekämpfen
            und Leben zu retten!
          </p>
        </div>
      </section>

      <section id="news">
        <div className="news-header">
          <h3>Aktuelle Neuigkeiten</h3>
        </div>

        <div className="news-subtext">
          <p>Möchten Sie mehr Neuigkeiten zur Covid-19 Pandemie?</p>
          <p>Hier finden Sie die aktuellsten Nachrichten zu Covid-19.</p>
        </div>
        <div>
          <div className="slideshow">
            <div class="slides">
              <input type="radio" name="radio-btn" id="radio1"></input>
              <input type="radio" name="radio-btn" id="radio2"></input>
              <input type="radio" name="radio-btn" id="radio3"></input>
              <input type="radio" name="radio-btn" id="radio4"></input>

              <div class="slide first">
                <a
                  target="_blank"
                  href="https://www.tagesschau.de/newsticker/liveblog-coronavirus-montag-153.html"
                >
                  <img src="../images/Tagesschau.jpg" alt=""></img>
                </a>
              </div>

              <div class="slide">
                <a
                  target="_blank"
                  href="https://www.swr.de/swraktuell/corona-aktuell-blog-130.html"
                >
                  <img src="../images/SWR Aktuell 2.jpg" alt=""></img>
                </a>
              </div>

              <div class="slide">
                <a
                  target="_blank"
                  href="https://www.n-tv.de/panorama/12-20-Krebsexperten-warnen-vor-bedrohlicher-Situation--article21626512.html"
                >
                  <img src="../images/n-tv.jpg" alt=""></img>
                </a>
              </div>

              <div class="slide">
                <a
                  target="_blank"
                  href="https://www1.wdr.de/nachrichten/themen/coronavirus/ticker-corona-virus-nrw-100.html"
                >
                  <img src="../images/WDR.jpg" alt=""></img>
                </a>
              </div>

              <div class="navigation-auto">
                <div class="auto-btn1"></div>
                <div class="auto-btn2"></div>
                <div class="auto-btn3"></div>
                <div class="auto-btn4"></div>
              </div>
            </div>

            <div class="navigation-manual">
              <label for="radio1" class="manual-btn"></label>
              <label for="radio2" class="manual-btn"></label>
              <label for="radio3" class="manual-btn"></label>
              <label for="radio4" class="manual-btn"></label>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
