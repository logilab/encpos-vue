<template>
    <section>
        <h1>Documentation</h1>
        <p>
            Thèses, l’application de consultation des positions des thèses de l’École des chartes est ouverte en Libre
            accès (<em>Open Access</em>). Elle est construite sur différentes API qui standardisent l’accès à toutes
            les ressources disponibles (textes et images) et en font une véritable plateforme d’accès aux données
            ouvertes (<em>Open Data</em>).
        </p>
        <p>
            Cette application entend répondre aux exigences éditoriales de l’accès libre et aux attentes scientifiques
            combinées de l’ouverture des données.
        </p>
        <p>
            Cette documentation met l’accent sur les requêtes <code>GET</code> : elle est conçue guider les chercheurs
            désireux de récupérer les données brutes à des fins d’analyse et les développeurs qui souhaiteraient fournir
            de nouveaux outils ou services.
        </p>
        <p>
            Pourquoi des API pour le partage de données ?
        </p>
        <ul>
            <li>Rendre les données FAIR (Findable, Accessible, Interoperable and Reusable).</li>
            <li>Favoriser leur republication et améliorer leur citabilité.</li>
            <li>Accéder aux données brutes et pouvoir les valider : s’affranchir de la médiation d’une interface graphique.</li>
            <li>Constituer librement des corpus sur mesure pour les analyses.</li>
            <li>Favoriser le développement d'interfaces utilisateur, d'outils et de services.</li>
        </ul>
    </section>
    <section>
        <h2>Identifiants</h2>
        <p>
            La structure éditoriale de la collection des positions des thèses est simple : une publication annuelle des
            positions des thèses soutenues depuis 1849. Les identifiants signifiants définis pour ce projet reflètent
            simplement cette structure :
        </p>
        <ul>
            <li><code>ENCPOS</code> : la collection racine</li>
            <li><code>ENCPOS_AAAA</code> : la collection des positions des thèses de l’année {AAAA}</li>
            <li><code>ENCPOS_AAAA_NN</code> : la {NN}ième position de l’année {AAAA}</li>
        </ul>
    </section>
    <section>
        <h2>Texte</h2>
        <p>
            Les ressources textuelles sont accessibles grâce à l’<a
                href="https://distributed-text-services.github.io/specifications/" target="_blank">API DTS</a>.
        </p>
        <p>
            La spécification <em>Distributed Text Services</em> (DTS) standardise l’accès aux collections et aux textes
            grâce à différents points d’entrée (<em>endpoints</em>).
        </p>
    </section>
    <section>
        <h3>Collections et métadonnées des documents</h3>
        <p>
            Le point d’entrée <a
                href="https://distributed-text-services.github.io/specifications/Collections-Endpoint.html"
                target="_blank"><code>Collections</code></a> permet de parcourir les collections et d’accéder aux
            métadonnées d’une position.
        </p>
        <pre>https://dev.chartes.psl.eu/dts/navigation?id={id}</pre>
        <p>
            Une collection contient les métadonnées de la collection ainsi que le tableau de ses membres. Un membre de
            la collection peut être une collection (ressource de type <code>Collection</code>), ou un document (sa
            description, ressource de type <code>Resource</code>).
        </p>
        <p>Pour une collection, les propriétés disponibles sont :</p>
        <ul>
            <li><code>@id</code> : id de la collection</li>
            <li><code>title</code> : son titre, une simple chaîne de caractère (sans enrichissement)</li>
            <li><code>totalItems</code> : nombre de ses membres</li>
            <li><code>dts:totalChildren</code> : TODO ?</li>
            <li><code>dts:totalParents</code> : TODO ?</li>
            <li><code>member</code> : le tableau de ses membres</li>
        </ul>
        <p>
            <code>dts:dublincore</code> liste des métadonnées Dublin Core :
        </p>
        <ul>
            <li><code>dc:title</code> : titre (et son code langue ISO 639-2 dans une liste)</li>
            <li><code>dc:publisher</code> : éditeur (label et URI de référence dans une liste)</li>
            <li><code>dc:language</code> : liste des langues utilisées (code <a
                    href="https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-2" target="_blank">ISO 639-2</a>)</li>
        </ul>
        <p>
            Pour un document, les propriétés disponibles sont :
        </p>
        <ul>
            <li><code>@id</code> : id du document</li>
            <li><code>title</code> : son titre, une simple chaîne de caractère (sans enrichissement)</li>
            <li><code>dts:passage</code> : lien vers le point d’entrée <code>Documents</code> pour la ressource (accès
                au fichier source XML/TEI)
            </li>
            <li><code>dts:references</code> : lien vers le point d’entrée <code>Navigation</code> pour la ressource,
                décrivant le modèle documentaire (un document = une position dans notre cas).
            </li>
            <li><code>dts:download</code> : lien de téléchargement du fichier source XML/TEI</li>
        </ul>
        <p>
            <code>dts:dublincore</code> liste des métadonnées Dublin Core :
        </p>
        <ul>
            <li><code>dc:title</code> : titre (et son code langue ISO 639-2 dans une liste)</li>
            <li><code>dc:creator</code> : auteur de la position (dans une liste, son label et les URI disponibles pour
                le liage : Sudoc, data.bnf.fr, Wikidata, Wikipedia, DBpedia)
            </li>
            <li><code>dc:date</code> : date de soutenance de la thèse et de publication de la position</li>
            <li><code>dc:language</code> : liste des langues utilisées (code <a
                    href="https://fr.wikipedia.org/wiki/Liste_des_codes_ISO_639-2" target="_blank">ISO 639-2</a>)
            </li>
            <li><code>dc:format</code> : <code>application/tei+xml</code></li>
            <li><code>dc:coverage</code>: couverture temporelle de la position (au format <a
                    href="https://www.loc.gov/standards/datetime/" target="_blank">EDTF</a>, <em>Extended Date/Time
                Format</em>)
            </li>
            <li><code>dc:extent</code> : pagination de la version imprimée -&gt; basculer dans <code>dc:source</code> ?
            </li>
            <li><code>dc:publisher</code> : éditeur (label et URI de référence dans une liste)</li>
            <li><code>dc:isVersionOf</code> : liste des URI Sudoc, HAL, BENC et/ou ThENC@ de la thèse résumée par la
                position
            </li>
            <li><code>dc:source</code> : référence et URI de la source imprimée, et lien aux ressources IIIF</li>
        </ul>

        <api-call-dropdown
                method="GET"
                description="La liste de tous les volumes disponibles"
                url="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS"
        />

        <api-call-dropdown
                method="GET"
                description="La liste des positions publiées en 1972, avec leurs métadonnées"
                url="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS_1972"
        />

        <api-call-dropdown
                method="GET"
                description="Les seules métadonnées de la position ENCPOS_1972_18"
                url="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS_1972_18"
        />

        <api-call-dropdown
                method="GET"
                description="Exemple de réponse attendue pour les métadonnées d’un document (en cours d’implémentation)"
                url="https://raw.githubusercontent.com/Corentinfaye/testgit/master/DTS_reponse/exempleDts_1972_18.json"
        />

    </section>

    <section>
        <h3>Documents</h3>
        <p>
            Le point d’entrée <a
                href="https://distributed-text-services.github.io/specifications/Documents-Endpoint.html" target="_blank"><code>Document</code></a>
            permet d’accéder au contenu intégral d’un document ou à ses parties.
        </p>
        <pre>https://dev.chartes.psl.eu/dts/document?id={id}</pre>
        <p>
            La réponse est un fichier XML/TEI P5, conforme aux schémas maintenus par l’École des chartes. Voir la
            documentation.
        </p>
        <p>
            Le paramètre de requête <code>format</code> permet de spécifier un autre format de réponse. À ce stade, seul
            le format <code>html</code> est implémenté.
        </p>

        <api-call-dropdown
                method="GET"
                description="Réponse par défaut (XML/TEI) pour l’intégralité de la position ENCPOS_1972_18"
                url="https://dev.chartes.psl.eu/dts/document?id=ENCPOS_1972_18"
        />

        <api-call-dropdown
                method="GET"
                description="Réponse formatée en HTML pour l’intégralité de la position ENCPOS_1972_18"
                url="https://dev.chartes.psl.eu/dts/document?id=ENCPOS_1972_18&xslt"
        />

        <p>
            NB. Toutes les sources XML/TEI sont également accessibles sur le <a
                href="https://github.com/chartes/encpos" target="_blank">projet Github</a> maintenu par l’École des chartes.
        </p>
    </section>

    <section>
        <h2>Images</h2>
        <p>
            Les images et leurs métadonnées sont accessibles grâce aux API IIIF.
        </p>
    </section>

    <section>
        <h3>Métadonnées</h3>
        <p>
            L’API IIIF <a href="https://iiif.io/api/presentation/3.0/" target="_blank">Presentation API 3.0</a> donne accès aux
            métadonnées utiles à la visualisation des images dans un visualiseur web tel que <a
                href="https://iiif.chartes.psl.eu/mirador" target="_blank">Mirador</a>. Les métadonnées sont donc inscrites de manière à
            être lues par un humain, mais sont structurées sémantiquement pour être disponibles pour une machine.
        </p>
        <ul>
            <li>Accès aux <em>collections</em> : <code>https://iiif.chartes.psl.eu/encpos/collection/{id}</code></li>
            <li>Accès aux <em>manifests</em> : <code>https://iiif.chartes.psl.eu/encpos/{id}/manifest</code></li>
        </ul>
        <p>
            Les métadonnées de chaque position (<em>manifests</em>) ont été enrichies, notamment :
        </p>
        <ul>
            <li><code>seeAlso</code> : liens vers la notice DTS de la position et vers la notice Sudoc MARC XML de la
                thèse résumée par la position
            </li>
            <li><code>rendering</code> : lien DTS (cf Document Endpoint) vers la source XML/TEI de la position</li>
            <li><code>metadata</code> : fournit des liages, notamment pour l’auteur (<a
                    href="https://www.idref.fr/autorites.jsp" target="_blank">idRef</a>, Wikipedia, data.bnf.fr, etc.)
            </li>
        </ul>

        <api-call-dropdown
                method="GET"
                description="Collection racine des positions des thèses"
                url="https://iiif.chartes.psl.eu/encpos/collection/top"
        />

        <api-call-dropdown
                method="GET"
                description="Collection des positions des thèses soutenues en 1972"
                url="https://iiif.chartes.psl.eu/encpos/collection/encpos_1972"
        />

        <api-call-dropdown
                method="GET"
                description="Description de la 18e position des thèses soutenues en 1972"
                url="https://iiif.chartes.psl.eu/encpos/encpos_1972_18/manifest"
        />

        <p>
            Les ressources IIIF (de type <code>Manifest</code> et <code>Collection</code>) sont aussi accessibles depuis
            la page d’accueil du <a href="https://iiif.chartes.psl.eu/" target="_blank">serveur IIIF de l’École des
            chartes</a> et être ainsi appelées par un visualiseur en ligne :
        </p>
        <ul>
            <li><em>Collections</em> : <a href="https://iiif.chartes.psl.eu/collections/encpos/"
                                          target="_blank">https://iiif.chartes.psl.eu/collections/encpos/</a>
            </li>
            <li><em>Manifests</em> : <a href="https://iiif.chartes.psl.eu/manifests/encpos/"
                                        target="_blank">https://iiif.chartes.psl.eu/manifests/encpos/</a>
            </li>
        </ul>
    </section>

    <section>
        <h3>Accès aux images et manipulations</h3>
        <p>
            L’API IIIF <a href="https://iiif.io/api/image/2.1/" target="_blank">Image 2.1.1</a> spécifie un service web qui renvoie une
            image en réponse à une demande HTTPS. L’URI peut spécifier la région, la taille, la rotation, les
            caractéristiques de qualité et le format de l’image demandée. L’API IIIF Image favorise ainsi la
            réutilisation des images.
        </p>
        <p>
            La syntaxe d’URI utile est la suivante :
        </p>
        <pre>{scheme}://{server}{/prefix}/{identifier}/{region}/{size}/{rotation}/{quality}.{format}</pre>
        <p>
            Dans notre cas :
        </p>
        <pre>https://iiif.chartes.psl.eu/images/encpos/{position-id}/{image-name}/{region}/{size}/{rotation}/{quality}.{format}</pre>
        <p>
            avec :
        </p>
        <ul>
            <li>{position-id} : identifiant de la position au format <code>ENCPOS_AAAA_NN</code> (v. Identifiants)</li>
            <li>{image-name} : nom de l’image au format <code>ENCPOS_AAAA_NN_PP.TIF</code> (<code>PP</code> pour le
                numéro d’ordre des pages).
            </li>
        </ul>
        <!-- ce serait trop beau !

                        <api-call-dropdown
                        method="GET"
                        description="Une zone retournée de la première page de la position ENCPOS_1972_18 au format JPG, en bitonal"
                        url="https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/189,471,1154,98/full/!180/bitonal.jpg"
                />
                -->
        <p>
            EX. La première page de la position <code>ENCPOS_1972_18</code> au format JPG, en pleine définition :
        </p>
        <pre><a
                href="https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/full/full/0/default.jpg"
                target="_blank">https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/full/full/0/default.jpg</a></pre>
        <p>
            EX. Une zone retournée de la première page de la position <code>ENCPOS_1972_18</code> au format PNG, en
            bitonal :
        </p>
        <pre><a
                href="https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/189,471,1154,98/full/!180/bitonal.png"
                target="_blank">https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/189,471,1154,98/full/!180/bitonal.png</a></pre>
        <p>
            L’API IIIF Image spécifie aussi un URI pour fournir des informations techniques sur l’image, telles que ses
            dimensions (<code>height</code> et <code>width</code>) et les fonctionnalités disponibles.
        </p>
        <pre>https://iiif.chartes.psl.eu/images/encpos/{position-id}/{image-name}/info.json</pre>

        <api-call-dropdown
                method="GET"
                description="Les informations sur la première page de la position ENCPOS_1972_18"
                url="https://iiif.chartes.psl.eu/images/encpos/ENCPOS_1972_18/ENCPOS_1972_18_01.TIF/info.json"
        />

    </section>

    <section>
        <h3>Lien texte/image</h3>
        <p>Dans la réponse DTS, conformément aux recommandations du <a
                href="https://distributed-text-services.github.io/specifications/Cookbook.html#iiif" target="_blank">Cookbook
            DTS</a>, un lien (<code>dts:dublicore.dc:source</code>) pointe vers la ressource IIIF
            correspondante, à chaque niveau de la structure éditoriale du corpus. Réciproquement, dans les ressources
            IIIF, un lien (<code>seeAlso</code>) pointe vers la réponse DTS correspondante.</p>
        <ul>
            <li><b>TODO</b>. La collection racine DTS <code><a
                    href="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS" target="_blank">ENCPOS</a></code> est
                liée à la collection <code><a href="https://iiif.chartes.psl.eu/encpos/collection/top" target="_blank">top</a></code>
                IIIF.
            </li>
            <li><b>TODO</b>. Une collection annuelle DTS (par ex. <code><a
                    href="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS_1972"
                    target="_blank">ENCPOS_1972</a></code>) est liée à la collection IIIF correspondante (<code><a
                    href="https://iiif.chartes.psl.eu/encpos/collection/encpos_1972"
                    target="_blank">encpos_1972</a></code>)
            </li>
            <li>Une collection DTS décrivant une position (par ex. <code><a
                    href="https://dev.chartes.psl.eu/dts/collections?id=ENCPOS_1972_18"
                    target="_blank">ENCPOS_1972_18</a></code>) est liée au <em>manifest</em> IIIF correspondant
                (<code><a href="https://iiif.chartes.psl.eu/encpos/encpos_1972_18/manifest" target="_blank">encpos_1972_18</a></code>)
            </li>
        </ul>
        <p>
            <b>TODO</b>. Dans la source XML/TEI, les images sont appelées à chaque saut de page (<code><a
                href="https://tei-c.org/release/doc/tei-p5-doc/fr/html/ref-pb.html"
                target="_blank">tei:pb/@facs</a></code>).
        </p>
    </section>


    <section>
        <h2>Recherche</h2>

        <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=Pastoureau"
    />

    <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=metadata.author_name:Diplomatie+OR+metadata.title_rich:Diplomatie+OR+metadata.author_firstname:Diplomatie&range[metadata.promotion_year]=gte:1849,lte:2017&page[number]=1&page[size]=40"
    />

    <api-call-dropdown
      method="GET"
      description="I'm the description"
      url="http://localhost:5003/api/1.0/search?query=metadata.author_name:Diplomatie+OR+metadata.title_rich:Diplomatie+OR+metadata.author_firstname:Diplomatie&range[metadata.promotion_year]=gte:1849,lte:2017&page[number]=1&page[size]=40"
    />
  </section>
</template>
<script>
import ApiCallDropdown from "@/components/documentation/ApiCallDropdown";

export default {
  name: "ApiDocumentation",
  components: {
    ApiCallDropdown,
  },
};
</script>

<style scoped></style>
