<template>
  <article class="documentation">
    <div class="tiles">
      <div class="tile page-header app-width-padding">
        <div class="tile is-child">
          <div class="is-flex is-flex-direction-row title-tile">
            <p class="title">Thèses de l'École nationale des chartes</p>
            <p class="header-baseline">
              <span>Position</span> : à l’origine, les positions prises et à défendre par
              l’élève, face au jury. Depuis, un résumé de la thèse soutenue.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="documentation-content">
      <div class="is-flex layout-main">
        <section class="toc" :class="menuCsscClass">
          <ul class="toc-lvl1">
            <li><a href="#ids-pattern">Structure éditoriale</a></li>
            <li>
              <a href="#dts-api">API Texte (DTS)</a>
              <ul class="toc-lvl2">
                <li><a href="#dts-collections">Collections</a></li>
                <li><a href="#dts-document">dts-document</a></li>
              </ul>
            </li>
            <li>
              <a href="#iiif-api">API Image (IIIF)</a>
              <ul class="toc-lvl2">
                <li><a href="#iiif-presentation">Métadonnées</a></li>
                <li><a href="#iiif-image">Images</a></li>
                <li><a href="#dts-iiif-links">Lien texte/image</a></li>
              </ul>
            </li>
            <li>
              <a href="#search-api">API de recherche (Elastic)</a>
              <ul class="toc-lvl2">
                <li>
                  <a href="#search-syntax">Syntaxe des requêtes</a>
                  <ul class="toc-lvl3">
                    <li><a href="#search-pagination">Pagination</a></li>
                    <li><a href="#search-wildcards">Wildcard query</a></li>
                    <li><a href="#search-regex">Regex</a></li>
                    <li><a href="#search-fuzzy">Recherche floue</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#search-response">Format de réponse</a>
                </li>
                <li>
                  <a href="#search-modes">Catalogue et concordances</a>
                  <ul class="toc-lvl3">
                    <li><a href="#search-filters-sort">Filtres et tris</a></li>
                    <li><a href="#search-catalogue">Catalogue</a></li>
                    <li><a href="#search-full-text">Concordances</a></li>
                    <li><a href="#search-both-modes">Concordances filtrées</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <a href="#" @click="toggleMenu($event)" class="toggle-menu-btn">MENU</a>
        <section class="main container content">
          <section class="section" id="documentation-top">
            <h1>Documentation</h1>
            <p>
              Thèses, l’application de consultation des positions des thèses de l’École
              des chartes est ouverte en Libre accès (<em>Open Access</em>). Elle est
              construite sur différentes API qui standardisent l’accès à toutes les
              ressources disponibles (textes et images) et en font une véritable
              plateforme d’accès aux données ouvertes (<em>Open Data</em>).
            </p>
            <p>
              Cette application entend répondre aux exigences éditoriales de l’accès libre
              et aux attentes scientifiques combinées de l’ouverture des données.
            </p>
            <p>
              Cette documentation met l’accent sur les requêtes <code>GET</code> : elle
              est conçue pour guider les chercheurs désireux de récupérer les données
              brutes à des fins d’analyse et les développeurs qui souhaiteraient fournir
              de nouveaux outils ou services.
            </p>
            <p>Pourquoi des API pour le partage de données ?</p>
            <ul>
              <li>
                Rendre les données FAIR (Findable, Accessible, Interoperable and
                Reusable).
              </li>
              <li>Favoriser leur republication et améliorer leur citabilité.</li>
              <li>
                Accéder aux données brutes et pouvoir les valider : s’affranchir de la
                médiation d’une interface graphique.
              </li>
              <li>Constituer librement des corpus sur mesure pour les analyses.</li>
              <li>
                Favoriser le développement d'interfaces utilisateur, d'outils et de
                services.
              </li>
              <li>Améliorer la pérennité des développements.</li>
            </ul>
          </section>

          <section class="section" id="ids-pattern">
            <h2>Structure éditoriale et identifiants</h2>
            <p>
              La structure éditoriale de la collection des positions des thèses est simple
              : une publication annuelle des positions des thèses soutenues depuis 1849.
              Les identifiants signifiants définis pour ce projet reflètent simplement
              cette structure :
            </p>
            <ul>
              <li><code>ENCPOS</code> : la collection racine</li>
              <li>
                <code>ENCPOS_AAAA</code> : la collection des positions des thèses de
                l’année {AAAA}
              </li>
              <li>
                <code>ENCPOS_AAAA_NN</code> : la {NN}ième position de l’année {AAAA}
              </li>
            </ul>
          </section>
          <div class="divider" />
          <section class="section" id="dts-api">
            <h2>Ressources textuelles</h2>
            <p>
              Les ressources textuelles sont accessibles grâce à l’<a
                href="https://distributed-text-services.github.io/specifications/"
                target="_blank"
                >API DTS</a
              >.
            </p>
            <p>
              La spécification <em>Distributed Text Services</em> (DTS) standardise
              l’accès aux collections et aux textes grâce à différents points d’entrée
              (<em>endpoints</em>).
            </p>
          </section>
          <section class="section" id="dts-collections">
            <h3>Collections et métadonnées des documents</h3>
            <p>
              Le point d’entrée
              <a
                href="https://distributed-text-services.github.io/specifications/Collections-Endpoint.html"
                target="_blank"
                ><code>Collections</code></a
              >
              permet de parcourir les collections et d’accéder aux métadonnées d’une
              position.
            </p>
            <pre>{{ DTS_URL }}/navigation?id={id}</pre>
            <p>
              Une collection contient les métadonnées de la collection ainsi que le
              tableau de ses membres. Un membre de la collection peut être une collection
              (ressource de type <code>Collection</code>), ou un document (sa description,
              ressource de type <code>Resource</code>).
            </p>
            <p>Pour une collection, les propriétés disponibles sont :</p>
            <ul>
              <li><code>@id</code> : id de la collection</li>
              <li>
                <code>title</code> : son titre, une simple chaîne de caractère (sans
                enrichissement)
              </li>
              <li><code>totalItems</code> : nombre de ses membres</li>
              <li><code>dts:totalChildren</code> : TODO ?</li>
              <li><code>dts:totalParents</code> : TODO ?</li>
              <li><code>member</code> : le tableau de ses membres</li>
            </ul>
            <p><code>dts:dublincore</code> liste des métadonnées Dublin Core :</p>
            <ul>
              <li>
                <code>dc:title</code> : titre (et son code langue ISO 639-2 dans une
                liste)
              </li>
              <li>
                <code>dc:publisher</code> : éditeur (label et URI de référence dans une
                liste)
              </li>
              <li>
                <code>dc:language</code> : liste des langues utilisées (code
                <a
                  href="https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-2"
                  target="_blank"
                  >ISO 639-2</a
                >)
              </li>
            </ul>
            <p>Pour un document, les propriétés disponibles sont :</p>
            <ul>
              <li><code>@id</code> : id du document</li>
              <li>
                <code>title</code> : son titre, une simple chaîne de caractère (sans
                enrichissement)
              </li>
              <li>
                <code>dts:passage</code> : lien vers le point d’entrée
                <code>Documents</code> pour la ressource (accès au fichier source XML/TEI)
              </li>
              <li>
                <code>dts:references</code> : lien vers le point d’entrée
                <code>Navigation</code> pour la ressource, décrivant le modèle
                documentaire (un document = une position dans notre cas).
              </li>
              <li>
                <code>dts:download</code> : lien de téléchargement du fichier source
                XML/TEI
              </li>
            </ul>
            <p><code>dts:dublincore</code> liste des métadonnées Dublin Core :</p>
            <ul>
              <li>
                <code>dc:title</code> : titre (et son code langue ISO 639-2 dans une
                liste)
              </li>
              <li>
                <code>dc:creator</code> : auteur de la position (dans une liste, son label
                et les URI disponibles pour le liage : Sudoc, data.bnf.fr, Wikidata,
                Wikipedia, DBpedia)
              </li>
              <li>
                <code>dc:date</code> : date de soutenance de la thèse et de publication de
                la position
              </li>
              <li>
                <code>dc:language</code> : liste des langues utilisées (code
                <a
                  href="https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-2"
                  target="_blank"
                  >ISO 639-2</a
                >)
              </li>
              <li><code>dc:format</code> : <code>application/tei+xml</code></li>
              <li>
                <code>dc:coverage</code>: couverture temporelle de la position (au format
                <a href="https://www.loc.gov/standards/datetime/" target="_blank">EDTF</a
                >, <em>Extended Date/Time Format</em>)
              </li>
              <li>
                <code>dc:extent</code> : pagination de la version imprimée -&gt; basculer
                dans <code>dc:source</code> ?
              </li>
              <li>
                <code>dc:publisher</code> : éditeur (label et URI de référence dans une
                liste)
              </li>
              <li>
                <code>dc:isVersionOf</code> : liste des URI Sudoc, HAL, BENC et/ou ThENC@
                de la thèse résumée par la position
              </li>
              <li>
                <code>dc:source</code> : référence et URI de la source imprimée, et lien
                aux ressources IIIF
              </li>
            </ul>
            <div class="api-calls">
              <api-call-dropdown
                method="GET"
                description="La liste de tous les volumes disponibles"
                :url="`${DTS_URL}/collections?id=ENCPOS`"
              />

              <!--

              <api-call-dropdown
                method="GET"
                description="La liste des positions publiées en 1972, avec leurs métadonnées"
                :url="`${DTS_URL}/collections?id=ENCPOS_1972`"
              />

              <api-call-dropdown
                method="GET"
                description="Les seules métadonnées de la position ENCPOS_1972_18"
                :url="`${DTS_URL}/collections?id=ENCPOS_1972_18`"
              />

              -->

              <api-call-dropdown
                method="GET"
                description="Exemple de réponse attendue pour la liste des positions publiées en 1972, avec leurs métadonnées"
                url="https://raw.githubusercontent.com/Corentinfaye/testgit/master/DTS_reponse/ENCPOS_1972.json"
              />

              <api-call-dropdown
                method="GET"
                description="Exemple de réponse attendue pour les métadonnées d’un document (en cours d’implémentation)"
                url="https://raw.githubusercontent.com/Corentinfaye/testgit/master/DTS_reponse/ENCPOS_1972_18.json"
              />
            </div>
          </section>

          <section class="section" id="dts-document">
            <h3>Documents</h3>
            <p>
              Le point d’entrée
              <a
                href="https://distributed-text-services.github.io/specifications/Documents-Endpoint.html"
                target="_blank"
                ><code>Document</code></a
              >
              permet d’accéder au contenu intégral d’un document ou à ses parties.
            </p>
            <pre>{{ DTS_URL }}/document?id={id}</pre>
            <p>
              La réponse est un fichier XML/TEI P5, conforme aux schémas maintenus par
              l’École des chartes. Voir la documentation.
            </p>
            <p>
              Le paramètre de requête <code>format</code> permet de spécifier un autre
              format de réponse. À ce stade, seul le format <code>html</code> est
              implémenté.
            </p>
            <div class="api-calls">
              <api-call-dropdown
                method="GET"
                description="Réponse par défaut (XML/TEI) pour l’intégralité de la position ENCPOS_1972_18"
                :url="`${DTS_URL}/document?id=ENCPOS_1972_18`"
                format="xml"
              />

              <api-call-dropdown
                method="GET"
                description="Réponse formatée en HTML pour l’intégralité de la position ENCPOS_1972_18"
                :url="`${DTS_URL}/document?id=ENCPOS_1972_18&format=html`"
                format="xml"
              />
            </div>
            <p>
              NB. Toutes les sources XML/TEI sont également accessibles sur le
              <a href="https://github.com/chartes/encpos" target="_blank"
                >projet Github</a
              >
              maintenu par l’École des chartes.
            </p>
          </section>

          <div class="divider" />

          <section class="section" id="iiif-api">
            <h2>Partage des images</h2>
            <p>Les images et leurs métadonnées sont accessibles grâce aux API IIIF.</p>
          </section>

          <section class="section" id="iiif-presentation">
            <h3>Métadonnées</h3>
            <p>
              L’API IIIF
              <a href="https://iiif.io/api/presentation/3.0/" target="_blank"
                >Presentation API 3.0</a
              >
              donne accès aux métadonnées utiles à la visualisation des images dans un
              visualiseur web tel que
              <a :href="`${IIIF_SERVER_URL}/mirador`" target="_blank">Mirador</a>. Les
              métadonnées sont donc inscrites de manière à être lues par un humain, mais
              sont structurées sémantiquement pour être disponibles pour une machine.
            </p>
            <ul>
              <li>
                Accès aux <em>collections</em> :
                <code>{{ IIIF_URL }}/collection/{id}</code>
              </li>
              <li>
                Accès aux <em>manifests</em> :
                <code>{{ IIIF_URL }}/{id}/manifest</code>
              </li>
            </ul>
            <p>
              Les métadonnées de chaque position (<em>manifests</em>) ont été enrichies,
              notamment :
            </p>
            <ul>
              <li>
                <code>seeAlso</code> : liens vers la notice DTS de la position et vers la
                notice Sudoc MARC XML de la thèse résumée par la position
              </li>
              <li>
                <code>rendering</code> : lien DTS (cf Document Endpoint) vers la source
                XML/TEI de la position
              </li>
              <li>
                <code>metadata</code> : fournit des liages, notamment pour l’auteur (<a
                  href="https://www.idref.fr/autorites.jsp"
                  target="_blank"
                  >idRef</a
                >, Wikipedia, data.bnf.fr, etc.)
              </li>
            </ul>
            <div class="api-calls">
              <api-call-dropdown
                method="GET"
                description="Collection racine des positions des thèses"
                :url="`${IIIF_URL}/collection/top`"
              />

              <api-call-dropdown
                method="GET"
                description="Collection des positions des thèses soutenues en 1972"
                :url="`${IIIF_URL}/collection/encpos_1972`"
              />

              <api-call-dropdown
                method="GET"
                description="Description de la 18e position des thèses soutenues en 1972"
                :url="`${IIIF_URL}/encpos_1972_18/manifest`"
              />
            </div>
            <p>
              Les ressources IIIF (de type <code>Manifest</code> et
              <code>Collection</code>) sont aussi accessibles depuis la page d’accueil du
              <a :href="IIIF_SERVER_URL" target="_blank"
                >serveur IIIF de l’École des chartes</a
              >
              et être ainsi appelées par un visualiseur en ligne :
            </p>
            <ul>
              <li>
                <em>Collections</em> :
                <a :href="`${IIIF_SERVER_URL}/collections/encpos/`" target="_blank"
                  >{{ IIIF_SERVER_URL }}/collections/encpos/</a
                >
              </li>
              <li>
                <em>Manifests</em> :
                <a :href="`${IIIF_SERVER_URL}/manifests/encpos/`" target="_blank"
                  >{{ IIIF_SERVER_URL }}/manifests/encpos/</a
                >
              </li>
            </ul>
          </section>

          <section class="section" id="iiif-image">
            <h3>Accès aux images et manipulations</h3>
            <p>
              L’API IIIF
              <a href="https://iiif.io/api/image/2.1/" target="_blank">Image 2.1.1</a>
              spécifie un service web qui renvoie une image en réponse à une demande
              HTTPS. L’URI peut spécifier la région, la taille, la rotation, les
              caractéristiques de qualité et le format de l’image demandée. L’API IIIF
              Image favorise ainsi la réutilisation des images.
            </p>
            <p>La syntaxe d’URI utile est la suivante :</p>
            <pre>
    {scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}</pre
            >
            <p>Dans notre cas :</p>
            <pre
              >{{
                IIIF_IMAGES_URL
              }}/{position-id}/{image-name}/{region}/{size}/{rotation}/{quality}.{format}</pre
            >
            <p>avec :</p>
            <ul>
              <li>
                {position-id} : identifiant de la position au format
                <code>ENCPOS_AAAA_NN</code> (v. Identifiants)
              </li>
              <li>
                {image-name} : nom de l’image au format
                <code>ENCPOS_AAAA_NN_PP.TIF</code> (<code>PP</code> pour le numéro d’ordre
                des pages).
              </li>
            </ul>
            <p>
              EX. La première page de la position <code>ENCPOS_1972_18</code> au format
              JPG, en pleine définition :
            </p>
            <pre><a
                    :href="`${IIIF_IMAGES_URL}/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/full/full/0/default.jpg`"
                    target="_blank">{{IIIF_IMAGES_URL}}/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/full/full/0/default.jpg</a></pre>
            <p>
              EX. Une zone retournée de la première page de la position
              <code>ENCPOS_1972_18</code> au format PNG, en bitonal :
            </p>
            <pre><a
                    :href="`${IIIF_IMAGES_URL}/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/189,471,1154,98/full/!180/bitonal.png`"
                    target="_blank">{{IIIF_IMAGES_URL}}/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/189,471,1154,98/full/!180/bitonal.png</a></pre>
            <p>
              L’API IIIF Image spécifie aussi un URI pour fournir des informations
              techniques sur l’image, telles que ses dimensions (<code>height</code> et
              <code>width</code>) et les fonctionnalités disponibles.
            </p>
            <pre>{{ IIIF_IMAGES_URL }}/{position-id}/{image-name}/info.json</pre>
            <div class="api-calls">
              <api-call-dropdown
                method="GET"
                description="Les informations sur la première page de la position ENCPOS_1972_18"
                :url="`${IIIF_IMAGES_URL}/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/info.json`"
              />
            </div>
          </section>

          <section class="section" id="dts-iiif-links">
            <h3>Lien texte/image</h3>
            <p>
              Dans la réponse DTS, conformément aux recommandations du
              <a
                href="https://distributed-text-services.github.io/specifications/Cookbook.html#iiif"
                target="_blank"
                >Cookbook DTS</a
              >, un lien (<code>dts:dublicore.dc:source</code>) pointe vers la ressource
              IIIF correspondante, à chaque niveau de la structure éditoriale du corpus.
              Réciproquement, dans les ressources IIIF, un lien (<code>seeAlso</code>)
              pointe vers la réponse DTS correspondante.
            </p>
            <ul>
              <li>
                La collection racine DTS
                <code
                  ><a :href="`${DTS_URL}/collections?id=ENCPOS`" target="_blank"
                    >ENCPOS</a
                  ></code
                >
                est liée à la collection
                <code
                  ><a :href="`${IIIF_URL}/collection/top`" target="_blank">top</a></code
                >
                IIIF.
              </li>
              <li>
                Une collection annuelle DTS (par ex.
                <code
                  ><a :href="`${DTS_URL}/collections?id=ENCPOS_1972`" target="_blank"
                    >ENCPOS_1972</a
                  ></code
                >) est liée à la collection IIIF correspondante (<code
                  ><a :href="`${IIIF_URL}/collection/encpos_1972`" target="_blank"
                    >encpos_1972</a
                  ></code
                >)
              </li>
              <li>
                Une collection DTS décrivant une position (par ex.
                <code
                  ><a :href="`${DTS_URL}/collections?id=ENCPOS_1972_18`" target="_blank"
                    >ENCPOS_1972_18</a
                  ></code
                >) est liée au <em>manifest</em> IIIF correspondant (<code
                  ><a :href="`${IIIF_URL}/encpos_1972_18/manifest`" target="_blank"
                    >encpos_1972_18</a
                  ></code
                >)
              </li>
            </ul>
            <p>
              Dans la source XML/TEI, les images sont appelées à chaque saut de page
              (<code
                ><a
                  href="https://tei-c.org/release/doc/tei-p5-doc/fr/html/ref-pb.html"
                  target="_blank"
                  >tei:pb/@facs</a
                ></code
              >).
            </p>
          </section>

          <div class="divider" />

          <section class="section" id="search-api">
            <h2>Service de recherche</h2>
            <p>
              L’API de recherche est construite avec
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/index.html"
                target="_blank"
                >Elasticsearch 6.8</a
              >.
            </p>
            <p>La recherche peut porter sur :</p>
            <ul>
              <li>
                les seules notices (catalogue) :
                <code>search?query=metadata.{field_name}:{search_string}</code>
              </li>
              <li>
                le corps du texte des positions (concordances) :
                <code>search?query={search_string}</code>
              </li>
            </ul>
            <p>
              L’objectif est de combiner les possibilités d’une recherche catalographique
              (retrouver un document) à celles de la recherche plein texte utiles au
              chercheur, à l’historiographe notamment.
            </p>
          </section>
          <section class="section" id="search-syntax">
            <h3>Syntaxe des requêtes</h3>
            <p>
              L’API de recherche utilise les requêtes de type
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-query-string-query.html#query-string-syntax"
                target="_blank"
                ><code>query_string</code></a
              >.
            </p>
            <p>
              NB. La recherche est insensible à la casse et aux accents (diacritiques).
            </p>
          </section>
          <section class="section" id="search-pagination">
            <h4>Pagination et nombre de résultats</h4>
            <p>Pagination : les résultats sont paginés.</p>
            <p>
              Le paramètre <code>page[size]</code> permet de définir le nombre de
              résultats par page, c’est-à-dire le nombre de notices retournées qui
              correspondent à la requête. Le paramètre <code>page[number]</code> permet
              d’accéder à une page spécifique du résultat. Le champ
              <code>total-count</code> de la réponse indique le nombre de notices total
              correspondant à la requête, indépendemment de la pagination.
            </p>
            <api-call-dropdown
              method="GET"
              description="La 1ère page de 2 résultats des positions dont le texte contient au moins une occurrence de 'cartulaire'"
              :url="`${API_URL}/search?query=cartulaire&page[size]=2`"
            />
            <api-call-dropdown
              method="GET"
              description="La 10e page de 2 résultats des positions dont le texte contient au moins une occurrence de 'cartulaire'"
              :url="`${API_URL}/search?query=cartulaire&page[size]=2&page[number]=10`"
            />
          </section>
          <section class="section" id="search-wildcards">
            <h4>Jokers (<em>Wildcard query</em>)</h4>
            <p>
              Dans une requête, les caractères joker (<em>wildcard operators</em>)
              représentent un ou plusieurs caractères :
            </p>
            <ul>
              <li><code>?</code> : un caractère indéfini</li>
              <li><code>*</code> : représente zéro à plusieurs caractères indéfinis</li>
            </ul>
            <api-call-dropdown
              method="GET"
              description="Wildcard operators, recherche 'ca?tulaire*'"
              :url="`${API_URL}/search?query=ca?tulaire*&page[size]=2`"
            />
          </section>
          <section class="section" id="search-regex">
            <h4>Expressions régulières</h4>
            <p>
              Dans une requête, une
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-regexp-query.html#regexp-syntax"
                target="_blank"
                >expression régulière</a
              >
              peut être intégrée entre 2 barres obliques (<code>/</code>).
            </p>
            <api-call-dropdown
              method="GET"
              description="'charte' (singulier/pluriel) et 'Chartres'…"
              :url="`${API_URL}/search?query=/chartr?es?/&page[size]=3&page[number]=2`"
            />
          </section>
          <section class="section" id="search-fuzzy">
            <h4>Recherche floue</h4>
            <p>
              Pour la
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/common-options.html#fuzziness"
                target="_blank"
                >recherche floue</a
              >, il est possile de passer en suffixe de la chaîne de caractère recherchée
              un paramètre (<em>fuzziness parameter</em>) définissant la
              <a
                href="https://fr.wikipedia.org/wiki/Distance_de_Levenshtein"
                target="_blank"
                >distance d'édition Levenshtein</a
              >
              maximale autorisée (ou le nombre d'éditions) : <code>~0</code> (recherche
              exacte), <code>~1</code> (recherche floue), <code>~2</code> (recherche très
              floue).
            </p>
            <api-call-dropdown
              method="GET"
              description="La recherche floue sur 'Clacy' retourne par exemple 'Flacy' ou 'Clécy'"
              :url="`${API_URL}/search?query=clacy~1`"
            />
          </section>
          <section class="section" id="search-response">
            <h3>Format de réponse</h3>
            <p>
              La réponse est le tableau des notices des positions. Pour chaque notice, les
              champs disponibles sont :
            </p>
            <ul>
              <li><code>title_rich</code> : le titre de la position</li>
              <li><code>author_firstname</code> : le prénom de l’auteur</li>
              <li><code>author_name</code> : le nom de l’auteur</li>
              <li>
                <code>author_gender</code> : genre de l’auteur (<code>1</code>: homme ou
                <code>2</code>: femme)
              </li>
              <li>
                <code>enc_teacher</code> : <code>1</code> si l’auteur est enseignant à
                l’ENC, sinon <code>null</code>
              </li>
              <li><code>promotion_year</code> : l’année de publication</li>
              <li>
                <code>topic_notBefore</code> : borne chronologique de début du sujet
              </li>
              <li><code>topic_notAfter</code> : borne chronologique de fin du sujet</li>
            </ul>
            <p><code>dts_url</code> : permet d’accéder à la position.</p>
          </section>
          <section class="section" id="search-modes">
            <h3>Catalogue et concordances</h3>
          </section>
          <section class="section" id="search-filters-sort">
            <h4>Filtres et tris</h4>
            <p>
              Les champs de la notice sont tous disponibles comme
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-query-string-query.html?baymax=rec&rogue=pop-1&elektra=docs#_field_names"
                target="_blank"
                >champ de la requête</a
              >.
            </p>
            <pre>/search?query=metadata.{field_name}:{search_string}</pre>
            <p>
              Par défaut, les résultats sont triés selon le score de pertinence calculé
              par Elastic Search. Le paramètre de requête <code>sort</code> permet de
              trier les résultats selon un champ choisi. Le préfixe optionnel
              <code>-</code> du nom du champ spécifie l’odre décroissant : par ex.
              <code>&sort=-metadata.promotion_year</code> pour un tri décroissant par date
              de publication.
            </p>
          </section>
          <section class="section" id="search-catalogue">
            <h4>Catalogue</h4>
            <p>La recherche sur le catalogue repose sur l’utilisation de ces champs.</p>
            <api-call-dropdown
              method="GET"
              description="Les positions dont l’auteur porte le nom 'Pastoureau'"
              :url="`${API_URL}/search?query=metadata.author_name:Pastoureau`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions dont l’auteur porte le prénom 'Michelle'"
              :url="`${API_URL}/search?query=metadata.author_firstname:Michelle`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions dont le titre contient le mot 'bestiaire'"
              :url="`${API_URL}/search?query=metadata.title_rich:bestiaire`"
            />
            <api-call-dropdown
              method="GET"
              description="Les 5 dernières positions (ordre antéchronologique de publication) dont le titre contient 'cartulaire'"
              :url="`${API_URL}/search?query=metadata.title_rich:cartulaire&sort=-metadata.promotion_year&page[size]=5`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions rédigées par de futurs enseignants de l’École"
              :url="`${API_URL}/search?query=metadata.enc_teacher:1`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions publiées avant 1851"
              :url="`${API_URL}/search?query=metadata.promotion_year:<1851`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions dont le sujet se déroule après 1968"
              :url="`${API_URL}/search?query=metadata.topic_notBefore:>1968`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions publiées en 1850 et en 1851"
              :url="`${API_URL}/search?query=metadata.promotion_year:(1850 OR 1851)`"
            />
            <p>
              NB. Les bornes chronologiques du sujet ne sont pas toujours renseignées et
              sont parfois fautives.
            </p>
            <p>Il est possible de combiner la recherche sur différents champs.</p>
            <api-call-dropdown
              method="GET"
              description="Les positions dont le sujet se déroule entre 1939 et 1945"
              :url="`${API_URL}/search?query=metadata.topic_notBefore:>=1939 AND metadata.topic_notAfter:<=1945`"
            />
            <p>
              Pour filtrer une requête par intervalle chronologique (bornes chronologiques
              sujet ou période de soutenance), il est aussi possible d’utiliser une
              requête de type
              <a
                href="https://www.elastic.co/guide/en/elasticsearch/reference/6.8/query-dsl-range-query.html"
                target="_blank"
                ><code>range</code></a
              >.
            </p>
            <p>Pour définir l’intervalle, on utilise :</p>
            <ul>
              <li><code>gt</code> : plus grand que</li>
              <li><code>gte</code> : plus grand ou égal</li>
              <li><code>lt</code> : plus petit</li>
              <li><code>lte</code> : plus petit ou égal</li>
            </ul>
            <api-call-dropdown
              method="GET"
              description="Recherche sur les titres relatifs à la musique, pendant la période baroque"
              :url="`${API_URL}/search?query=metadata.title_rich:musi*&range[metadata.topic_notBefore]=gte:1600&range[metadata.topic_notAfter]=lte:1750`"
            />
          </section>
          <section class="section" id="search-full-text">
            <h4>Concordances</h4>
            <p>
              Il est possible de lister toutes les occurrences d’un motif dans le corps de
              texte des positions.
            </p>
            <pre>/search?query={search_string}</pre>
            <p>
              Dans la réponse, <code>highlight</code> liste alors les 100 premières
              concordances pour le motif recherché.
            </p>
            <api-call-dropdown
              method="GET"
              description="Les positions contenant le mot 'bestaire'"
              :url="`${API_URL}/search?query=bestiaire`"
            />
            <p>Les requêtes de type <code>range</code> sont également possibles :</p>
            <api-call-dropdown
              method="GET"
              description="Recherche plein texte relative à la musique, pendant la période baroque"
              :url="`${API_URL}/search?query=musi*&range[metadata.topic_notBefore]=gte:1600&range[metadata.topic_notAfter]=lte:1750`"
            />
            <api-call-dropdown
              method="GET"
              description="Recherche plein texte relative à la musique, pendant la période baroque, pour les positions rédigées à partir de 2000"
              :url="`${API_URL}/search?query=musi*&range[metadata.topic_notBefore]=gte:1600&range[metadata.topic_notAfter]=lte:1750&range[metadata.promotion_year]=gte:2000`"
            />
          </section>
          <section class="section" id="search-both-modes">
            <h4>Filtrer les concordances par notice</h4>
            <p>
              Il est possible de combiner recherche plein texte et recherche
              catalographique. Cela revient à filtrer le recherche plein texte grâce aux
              champs des notices.
            </p>
            <pre>
/search?query={search_string} AND metadata.{field_name}:{search_string}</pre
            >
            <api-call-dropdown
              method="GET"
              description="La position contenant le mot 'bestiaire' publiée en 1972…"
              :url="`${API_URL}/search?query=bestiaire AND metadata.promotion_year:1972`"
            />
            <api-call-dropdown
              method="GET"
              description="Les positions contenant le mot 'football' rédigées par une femme"
              :url="`${API_URL}/search?query=football AND metadata.author_gender:2`"
            />
            <api-call-dropdown
              method="GET"
              description="Recherche des occurrences 'Pastoureau' uniquement dans le corps du texte (d’un autre auteur)"
              :url="`${API_URL}/search?query=Pastoureau AND _exists_:metadata.author_name AND metadata.author_name:(NOT Pastoureau)`"
            />
            <p>
              Dans cette requête <code>_exists_</code> permet d’exclure du résultat les
              documents qui n‘ont pas d’auteur (le paratexte introductif et conclusif) ;
              le filtre <code>metadata.author_name:(NOT Pastoureau)</code> exclut du
              résultat les positions rédigées par les auteurs nommés Pastoureau. On liste
              ainsi les seules occurrences de 'Pastoureau' citées par d’autres auteurs.
            </p>
          </section>
        </section>
      </div>
    </div>
  </article>
</template>

<script>
import ApiCallDropdown from '@/components/documentation/ApiCallDropdown.vue'

export default {
  name: 'DocumentationPage',
  components: { ApiCallDropdown },
  data () {
    return {
      API_URL: `${import.meta.env.VITE_ELASTICSEARCH_URL}`,
      DTS_URL: `${import.meta.env.VITE_API_URL}`,
      IIIF_SERVER_URL: `${import.meta.env.VITE_IIIF_SERVER_URL}`,
      IIIF_URL: `${import.meta.env.VITE_IIIF_URL}`,
      IIIF_IMAGES_URL: `${import.meta.env.VITE_IIIF_IMAGES_URL}`,
      isMenuOpened: false
    }
  },
  computed: {
    menuCsscClass () {
      return this.isMenuOpened ? 'opened' : ''
    }
  },
  methods: {
    toggleMenu ($event) {
      $event.preventDefault()
      $event.stopImmediatePropagation()
      this.isMenuOpened = !this.isMenuOpened
    },
    closeMenu () {
      this.isMenuOpened = false
    }
  },
  mounted () {
    document.body.addEventListener('click', this.closeMenu)
  },
  beforeUnmount () {
    document.body.removeEventListener('click', this.closeMenu)
  }
}
</script>

<style scoped>
.tile.page-header {
  margin-bottom: 0 !important;
}
.documentation-content {
  padding: 0 40px;
}
.main {
  font-family: "Barlow", sans-serif !important;
  font-size: 18px;
  text-align: left;
  font-weight: 400;
  line-height: 28px;
  color: #5f5f5f;

  grid-area: "sidebar";
  padding-bottom: 150px;
}
.main p {
  text-indent: 0;
  padding: 10px 0;
}
.main h1,
.main h2,
.main h3,
.main h4,
.main h5 {
  font-family: "Noto Serif", serif;
  font-style: normal;
  font-weight: 400;
}
.main h1,
.main h2 {
  margin: 60px 0 !important;
  padding-top: 0;
}
.main h1 {
  font-size: 35px;
  line-height: 47px;
}
.main h2 {
  font-size: 25px;
  line-height: 34px;
}
article.documentation {
  margin-top: 0;
}
.content {
  width: calc(100% - 300px);
}
.content p,
.content ul {
  font-family: "Barlow", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  color: #5f5f5f;
}
.content ul {
  padding-bottom: 10px;
  margin-left: 0;
  list-style-position: inside;
}
.content ul > li {
  margin-bottom: 0;
}
.content h1,
.content h2 {
  padding-top: 0;
}
.content h1 {
  margin: 30px 0 !important;
  font-family: "Noto Serif", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 30px;
  line-height: 42px;
}
.content h2 {
  margin: 70px 0 30px !important;
  font-family: "Barlow", sans-serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  color: #b9192f;
}

.toc {
  flex: 300px 0 0;
  grid-area: "main";
  background-color: #ffffff;
  padding: 60px 80px 60px 0;
  font-family: "Barlow Semi Condensed", sans-serif;
  font-size: 16px;
  text-transform: uppercase;
}
.toc > ul {
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: #b9192f;
  border-style: dotted;
}
.toc > ul > li {
  margin: 20px 0;
}
.toc > ul > li > a {
  font-weight: bold;
}
.toc a {
  color: #444;
}
.toc a:hover {
  color: #e63946;
}
.toc-lvl2 {
  padding-left: 0;
  margin-top: -5px;
}
.toc-lvl2 li {
  margin: 10px 0;
}
.toc-lvl3 {
  margin-left: 20px;
}
.divider {
  height: 1px;
  background-color: #cecece;
  margin: 32px 20px;
  min-width: 100%;
}
.section {
  padding-top: 0px;
  padding-bottom: 40px;
}
.api-calls {
  margin-top: 20px;
  margin-bottom: 30px;
}
.toggle-menu-btn {
  font-family: "Barlow Semi Condensed", sans-serif;
  font-size: 0;
  font-weight: 500;
  color: #b9192f;
  text-transform: uppercase;

  display: none;
  padding: 0 5px;
  background: url(../assets/images/mob_burger.svg) center / contain no-repeat;
}
@media screen and (max-width: 800px) {
  .tile.page-header > .is-child {
    padding-left: 40px;
    padding-right: 40px;
  }
  .toggle-menu-btn {
    display: block;
    width: 20px;
    height: 30px;
    position: fixed;
    z-index: 3;
    left: 10px;
    top: 80px;
  }
  .toc {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    padding-left: 60px;
    padding-right: 30px;
    padding-top: 120px;
    background-color: rgba(255, 255, 255, 0.95);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transform: translateX(-110%);
    height: 100vh;
    overflow: auto;
  }
  .toc.opened {
    transform: translateX(0%);
    border-right: 1px solid #ccc;
  }
  .toc > ul {
    border: none !important;
  }
  .divider {
    width: calc(100vw - 100px);
    min-width: unset;
  }
  .content {
    width: 100%;
    padding: 0 0 50px;
    z-index: 1;
  }
  .content .section {
    padding-top: 0;
    padding-bottom: 10px;
  }
  .content p,
  .content ul {
    font-size: 16px;
    line-height: 24px;
  }
  .content p {
    margin: 0 !important;
  }
  .content ul {
    list-style-position: outside;
    margin: 20px 0 20px 10px !important;
  }
  .content h1,
  .content h2 {
    text-align: left;
    width: 80%;
  }
  .content h1 {
    font-size: 30px;
    line-height: 36px;
    margin: 35px 0 !important;
  }
  .content h2,
  .content h3,
  .content h4 {
    margin: 10px 0 !important;
  }
  .content h2 {
    font-size: 20px;
    line-height: 26px;
  }
  .content h3 {
    font-size: 18px;
    line-height: 24px;
  }
  :deep(.method) {
    width: 45px;
    font-size: 10px !important;
    margin-right: 10px !important;
    padding: 0 !important;
  }
  :deep(.grid-container) {
    grid-template-columns: 70px auto 35px;
    font-size: 12px;
    line-height: 21px;
  }
}
@media screen and (max-width: 500px) {
  .toggle-menu-btn {
  }
}
</style>
