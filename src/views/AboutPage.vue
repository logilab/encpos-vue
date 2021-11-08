<template>
  <article class="about">
    <div class="tiles">
      <div class="tile page-header app-width-padding">
        <div class="tile is-child">
          <div class="is-flex is-flex-direction-row title-tile">
            <p class="title">Thèses de l'École nationale des chartes</p>
            <p class="header-baseline"><span>Position</span> : Lieu où est placée une chose, une personne, par rapport à un ensemble.</p>
          </div>
        </div>
      </div>
    </div>
    <section class="main container content app-width-margin">
      <h1>Le projet</h1>
      <p>Ce site est dédié aux thèses soutenues par les élèves de l'École nationale des chartes. 
        La thèse pour le diplôme d'archiviste paléographe est un travail de recherche privilégiant l'exploration des champs spécifiques aux enseignements de l'École :</p>
        <ul>
          <li>Histoire et étude critique des sources historiques ;</li>
          <li>Philologie et édition de textes ;</li>
          <li>Patrimoine documentaire, écrit et gravé ;</li>
          <li>Patrimoine artistique et monumental.</li>
        </ul>
        <p>Ces travaux de recherche sont encadrés par les professeurs de l'École ainsi que par des universitaires, des chercheurs et des conservateurs. 
          Certaines thèses donnent lieu à des publications (<a href="http://www.chartes.psl.eu/fr/rubrique-bibliotheque/ressources-electroniques-externes?field_collectionedition_value=All&field_periodehistorique_value=All&field_theme_value=All" target="_blank">monographies</a> ou articles). 
          Sous leur forme dactylographiée, elles sont conservées aux Archives nationales et leur consultation est soumise à une réglementation. 
          Les thèses font l'objet de résumés détaillés et rédigés par les auteurs, appelés positions de thèses qui donnent lieu, chaque année, à la publication d'un recueil par l'École des chartes. 
          Le texte des positions de thèses est librement et gratuitement consultable sur ce site depuis 2000.</p>
        <h2>Réglementation pour la consultation des thèses</h2>
        <p>Il faut distinguer deux périodes dans l'histoire des thèses de l'École nationale des chartes : avant et après 1961.</p>
        <p>Avant 1961, l'École n'a pas conservé d'exemplaires des thèses, qui sont restées la propriété de leurs auteurs. 
          Toutefois, ces derniers ou leurs ayants droit ont pu donner ou déposer, à titre privé, leur thèse auprès d'une institution de conservation, publique (bibliothèque, services d'archives) ou privée (société savante, par exemple).</p>
        <p>Depuis 1961, un exemplaire de chaque thèse est conservé au Centre historique des Archives nationales, à Paris, dans la sous-série AB XXVIII (<a href="http://www.archivesnationales.culture.gouv.fr/chan/chan/ap03.html#ABchartes" target="_blank">répertoire dactylographié disponible)</a>. 
          La communication est soumise à l'autorisation préalable de l'auteur, qui est sollicitée directement par les Archives nationales.</p>
        <p>Toute personne désireuse de consulter une thèse à partir de la promotion 1961 doit donc adresser aux Archives nationales, via son site internet (http://www.archives-nationales.culture.gouv.fr/sia/web/guest/autorisations), une demande d'autorisation qui sera transmise à l'auteur de la thèse. 
          Celui-ci étant libre de communiquer sa réponse (favorable ou négative) dans le délai qui lui convient, aucun engagement ne peut être pris sur la date de la consultation éventuelle.</p>
        <p>La consultation se fait uniquement sur place aux Archives nationales et nécessite une inscription préalable avec production d'une pièce d'identité.</p>
    </section>
  </article>
</template>
<style>
article.about {
  margin-top: 0;
}
.about .content {
  font-family: "Libre Baskerville", serif !important;
  font-size: 16px;
  text-align: left;
  font-weight: 400;
  line-height: 28px;
  color: #5F5F5F;
  text-indent: 0;
  padding: 0 8% 100px;
}
.about .content p,
.about .content ul {
  font-family: "Barlow", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  color: #5F5F5F;
}
.about .content p {
  text-align: left;
  text-indent: 0;
}
.about .content ul {
  padding-bottom: 10px;
  margin-left: 0;
  list-style-position: inside;
}
.about .content ul > li {
  margin-bottom: 0;
}
.about .content h1,
.about .content h2 {
  padding-top: 0;
}
.about .content h1 {
  margin: 30px 0 !important;
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 30px;
  line-height: 42px;
}
.about .content h2 {
  margin: 70px 0 30px !important;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  color: #B9192F;
}

@media screen and (max-width: 800px) {
  .about .content {
    padding: 0 20px 50px;
  }
  .about .content p,
  .about .content ul {
    font-size: 16px;
    line-height: 24px;
  }
  .about .content p {
    margin: 0 0 !important;
  }
  .about .content ul {
    list-style-position: inside;
    margin: 20px 0 !important;
  }
  .about .content h1 {
    width: 80%;
    margin: 35px 0 !important;
    font-size: 30px;
    line-height: 36px;
  }
  .about .content h1,
  .about .content h2 {
    text-align: left;
    width: 80%;
  }
}

</style>