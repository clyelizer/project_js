# Module 2: Variables et Types de Données

Maintenant que vous avez une idée de ce qu'est Python et comment l'installer, il est temps de plonger dans les fondations de la programmation : les variables et les types de données. Ces concepts sont essentiels pour stocker, manipuler et organiser les informations dans vos programmes.

## 1. Variables

Imaginez une variable comme une boîte étiquetée dans laquelle vous pouvez stocker une information. Cette information peut être un nombre, du texte, ou des structures plus complexes que nous verrons plus tard.

*   **Concept de Variable**
    *   En programmation, une variable est un nom symbolique associé à une valeur. Elle sert à stocker des données qui peuvent être utilisées et modifiées au cours de l'exécution d'un programme.
    *   L'utilisation de variables rend le code plus lisible et plus facile à comprendre, car au lieu d'utiliser directement une valeur (par exemple, le nombre `3.14159`), on peut utiliser un nom descriptif (comme `pi`).

*   **Règles de Nommage des Variables en Python**
    *   Un nom de variable doit commencer par une lettre (a-z, A-Z) ou un tiret bas (`_`).
    *   Le reste du nom peut contenir des lettres, des chiffres (0-9) et des tirets bas.
    *   Les noms de variables sont sensibles à la casse (par exemple, `age`, `Age` et `AGE` sont trois variables différentes).
    *   Il existe des mots-clés réservés par Python (comme `if`, `for`, `while`, `def`, `class`, etc.) qui ne peuvent pas être utilisés comme noms de variables. Vous obtiendrez une erreur de syntaxe si vous essayez.
    *   **Convention (PEP 8) :** Utilisez des noms en minuscules, avec des mots séparés par des tirets bas pour améliorer la lisibilité (style "snake_case").
        *   Exemples valides : `nom_utilisateur`, `age`, `total_general`, `_valeur_temporaire`
        *   Exemples non valides : `2noms` (commence par un chiffre), `nom-utilisateur` (contient un tiret), `for` (mot-clé réservé)

*   **Affectation de Valeurs**
    *   En Python, on utilise l'opérateur d'affectation `=` pour assigner une valeur à une variable.
    *   La syntaxe est `nom_de_la_variable = valeur`.
    *   Python est un langage à typage dynamique, ce qui signifie que vous n'avez pas besoin de déclarer explicitement le type d'une variable avant de l'utiliser. Python détermine automatiquement le type de la variable en fonction de la valeur que vous lui affectez.

    ```python
    # Affectation de valeurs à des variables
    prenom = "Alice"  # La variable 'prenom' stocke la chaîne de caractères "Alice"
    age = 30          # La variable 'age' stocke l'entier 30
    taille = 1.65     # La variable 'taille' stocke le nombre à virgule flottante 1.65
    est_etudiant = False # La variable 'est_etudiant' stocke le booléen False

    # Afficher les valeurs des variables
    print(prenom)
    print(age)
    print(taille)
    print(est_etudiant)

    # Les variables peuvent être réaffectées avec de nouvelles valeurs (et même de nouveaux types)
    age = 31
    print(age)

    age = "trente et un" # Maintenant 'age' stocke une chaîne de caractères
    print(age)
    ```

## 2. Types de Données Fondamentaux

Python dispose de plusieurs types de données intégrés pour représenter différentes sortes d'informations. Voici les plus courants :

*   **Nombres**
    Python distingue principalement deux types de nombres :

    *   **Entiers (`int`) :** Ce sont des nombres entiers, positifs ou négatifs, sans partie décimale.
        ```python
        nombre_d_eleves = 25
        temperature_matin = -5
        annee_actuelle = 2023

        print(type(nombre_d_eleves)) # Affiche : <class 'int'>
        ```
    *   **Nombres à Virgule Flottante (`float`) :** Ce sont des nombres qui ont une partie décimale, ou qui sont exprimés en notation scientifique.
        ```python
        prix_cafe = 2.50
        pi = 3.14159
        distance_terre_soleil = 1.496e11 # Notation scientifique pour 1.496 * 10^11

        print(type(prix_cafe)) # Affiche : <class 'float'>
        ```
    *   **Opérations de Base sur les Nombres :**
        Python supporte les opérations arithmétiques classiques :
        ```python
        a = 10
        b = 3

        somme = a + b        # Addition : 13
        difference = a - b   # Soustraction : 7
        produit = a * b      # Multiplication : 30
        quotient = a / b     # Division (donne toujours un float) : 3.333...
        division_entiere = a // b # Division entière (tronque la partie décimale) : 3
        reste = a % b        # Modulo (reste de la division entière) : 1
        puissance = a ** b   # Exponentiation (a élevé à la puissance b) : 1000

        print(somme)
        print(quotient)
        print(division_entiere)
        print(reste)
        ```
        Il existe aussi le type `complex` pour les nombres complexes, mais il est moins couramment utilisé par les débutants.

*   **Chaînes de Caractères (`str`)**
    Les chaînes de caractères sont utilisées pour représenter du texte.

    *   **Définition :** Elles peuvent être définies en utilisant des guillemets simples (`'...'`), doubles (`"..."`) ou triples (`'''...'''` ou `"""..."""`). Les guillemets triples sont utiles pour les chaînes qui s'étendent sur plusieurs lignes ou qui contiennent des guillemets simples et doubles.
        ```python
        message_simple = 'Bonjour tout le monde !'
        question = "Comment allez-vous ?"
        paragraphe = """Ceci est un long paragraphe
        qui s'étend sur plusieurs lignes.
        Il peut contenir des 'guillemets simples' et des "doubles".
        """

        print(message_simple)
        print(question)
        print(paragraphe)
        print(type(message_simple)) # Affiche : <class 'str'>
        ```
    *   **Concaténation :** Vous pouvez combiner des chaînes de caractères en utilisant l'opérateur `+`.
        ```python
        salutation = "Salut"
        nom = "Bob"
        message_complet = salutation + " " + nom + " !" # Ajout d'un espace
        print(message_complet) # Affiche : Salut Bob !
        ```
    *   **Méthodes Courantes des Chaînes :** Les chaînes de caractères ont de nombreuses méthodes utiles. Une méthode est une fonction qui "appartient" à un objet (ici, un objet chaîne).
        ```python
        texte = "Python est Amusant"

        # len() : obtenir la longueur de la chaîne
        print(len(texte)) # Affiche : 19

        # .upper() : convertir en majuscules
        print(texte.upper()) # Affiche : PYTHON EST AMUSANT

        # .lower() : convertir en minuscules
        print(texte.lower()) # Affiche : python est amusant

        # .find(sous_chaine) : trouver la première occurrence d'une sous-chaîne (renvoie l'index ou -1 si non trouvée)
        print(texte.find("est")) # Affiche : 7 (l'index commence à 0)
        print(texte.find("Java")) # Affiche : -1

        # .replace(ancienne, nouvelle) : remplacer des occurrences d'une sous-chaîne
        print(texte.replace("Amusant", "Génial")) # Affiche : Python est Génial

        # .strip() : supprimer les espaces au début et à la fin
        texte_avec_espaces = "   Bonjour   "
        print(texte_avec_espaces.strip()) # Affiche : "Bonjour"

        # .split(separateur) : découper la chaîne en une liste de sous-chaînes
        mots = texte.split(" ")
        print(mots) # Affiche : ['Python', 'est', 'Amusant']
        ```
    *   **Formatage de Chaînes :** Il est souvent nécessaire d'insérer des valeurs de variables dans des chaînes.
        *   **f-strings (chaînes formatées littérales) - Recommandé :** Introduites en Python 3.6, elles sont concises et lisibles.
            ```python
            nom = "Charlie"
            age = 25
            message = f"Je m'appelle {nom} et j'ai {age} ans."
            print(message) # Affiche : Je m'appelle Charlie et j'ai 25 ans.

            # On peut aussi mettre des expressions directement dans les accolades
            print(f"Dans 5 ans, {nom} aura {age + 5} ans.")
            ```
        *   **Méthode `.format()` :** Une autre façon, plus ancienne mais toujours utilisée.
            ```python
            nom = "David"
            age = 40
            message = "Je m'appelle {} et j'ai {} ans.".format(nom, age)
            print(message) # Affiche : Je m'appelle David et j'ai 40 ans.

            message_avec_index = "J'ai {1} ans et je m'appelle {0}.".format(nom, age)
            print(message_avec_index) # Affiche : J'ai 40 ans et je m'appelle David.
            ```

*   **Booléens (`bool`)**
    Le type booléen représente l'une des deux valeurs : `True` (Vrai) ou `False` (Faux). Notez la majuscule au début de `True` et `False`.

    *   **Valeurs `True` et `False` :**
        ```python
        a_plu_aujourdhui = True
        le_soleil_est_vert = False

        print(a_plu_aujourdhui)       # Affiche : True
        print(type(le_soleil_est_vert)) # Affiche : <class 'bool'>
        ```
    *   **Utilisation dans les Conditions :** Les booléens sont fondamentaux pour les structures de contrôle (comme les instructions `if` que nous verrons au Module 4) qui permettent à votre programme de prendre des décisions. Les opérateurs de comparaison (comme `==`, `!=`, `>`, `<`) retournent des booléens.
        ```python
        age_utilisateur = 18
        est_majeur = age_utilisateur >= 18 # L'expression 'age_utilisateur >= 18' est évaluée à True
        print(f"L'utilisateur est majeur : {est_majeur}") # Affiche : L'utilisateur est majeur : True

        temperature = 25
        est_confortable = temperature > 20 and temperature < 30 # Utilisation d'opérateurs logiques
        print(f"La température est confortable : {est_confortable}") # Affiche : La température est confortable : True
        ```

## 3. Structures de Données de Base

Python offre des types de données intégrés pour regrouper et organiser plusieurs valeurs. Ce sont des "collections" ou "conteneurs".

*   **Listes (`list`)**
    Une liste est une collection ordonnée et modifiable d'éléments. Les éléments peuvent être de types différents.

    *   **Définition et Création :** On définit une liste en plaçant les éléments séparés par des virgules entre crochets `[]`.
        ```python
        nombres = [1, 2, 3, 4, 5]
        fruits = ["pomme", "banane", "cerise"]
        mixte = [10, "hello", 3.14, True]
        liste_vide = []

        print(nombres)
        print(fruits)
        print(mixte)
        print(type(fruits)) # Affiche : <class 'list'>
        ```
    *   **Indexation et Découpage (Slicing) :**
        *   **Indexation :** Accéder à un élément par sa position (index). L'indexation commence à 0.
            ```python
            print(fruits[0]) # Affiche : pomme
            print(fruits[1]) # Affiche : banane
            # print(fruits[3]) # Erreur : IndexError, car l'index 3 est hors limites
            ```
        *   **Indexation Négative :** `-1` se réfère au dernier élément, `-2` à l'avant-dernier, etc.
            ```python
            print(fruits[-1]) # Affiche : cerise (dernier élément)
            ```
        *   **Découpage (Slicing) :** Extraire une sous-liste. Syntaxe : `liste[debut:fin:pas]`. `fin` est exclus.
            ```python
            nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            print(nombres[2:5])    # Affiche : [2, 3, 4] (éléments de l'index 2 à 4)
            print(nombres[:3])     # Affiche : [0, 1, 2] (du début à l'index 2)
            print(nombres[6:])     # Affiche : [6, 7, 8, 9] (de l'index 6 à la fin)
            print(nombres[::2])    # Affiche : [0, 2, 4, 6, 8] (un élément sur deux)
            print(nombres[::-1])   # Affiche : [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (liste inversée)
            ```
    *   **Méthodes Courantes des Listes :** Les listes sont modifiables, ce qui signifie que vous pouvez changer leur contenu.
        ```python
        couleurs = ["rouge", "vert", "bleu"]
        print(couleurs)

        # len() : obtenir le nombre d'éléments
        print(len(couleurs)) # Affiche : 3

        # .append(element) : ajouter un élément à la fin
        couleurs.append("jaune")
        print(couleurs) # Affiche : ['rouge', 'vert', 'bleu', 'jaune']

        # .insert(index, element) : insérer un élément à un index spécifique
        couleurs.insert(1, "orange")
        print(couleurs) # Affiche : ['rouge', 'orange', 'vert', 'bleu', 'jaune']

        # .remove(element) : supprimer la première occurrence d'un élément
        couleurs.remove("vert")
        print(couleurs) # Affiche : ['rouge', 'orange', 'bleu', 'jaune']

        # .pop(index) : supprimer et retourner l'élément à un index (par défaut, le dernier)
        couleur_supprimee = couleurs.pop(1)
        print(couleur_supprimee) # Affiche : orange
        print(couleurs) # Affiche : ['rouge', 'bleu', 'jaune']

        dernier_element = couleurs.pop()
        print(dernier_element) # Affiche : jaune
        print(couleurs) # Affiche : ['rouge', 'bleu']

        # .sort() : trier la liste sur place (modifie la liste originale)
        nombres_desordre = [3, 1, 4, 1, 5, 9, 2]
        nombres_desordre.sort()
        print(nombres_desordre) # Affiche : [1, 1, 2, 3, 4, 5, 9]
        nombres_desordre.sort(reverse=True) # Tri décroissant
        print(nombres_desordre) # Affiche : [9, 5, 4, 3, 2, 1, 1]

        # Modifier un élément
        couleurs[0] = "violet"
        print(couleurs) # Affiche : ['violet', 'bleu']
        ```
    *   **Listes de Listes (Structures Imbriquées) :** Une liste peut contenir d'autres listes.
        ```python
        matrice = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]
        print(matrice[0])      # Affiche : [1, 2, 3]
        print(matrice[1][1])   # Affiche : 5 (élément à la ligne 1, colonne 1)
        ```

*   **Dictionnaires (`dict`)**
    Un dictionnaire est une collection non ordonnée (avant Python 3.7, maintenant ordonnée par insertion en CPython 3.7+) d'éléments stockés sous forme de paires clé-valeur. Les clés doivent être uniques et immuables (par exemple, chaînes, nombres, tuples).

    *   **Concept Clé-Valeur :** Chaque valeur est associée à une clé unique, ce qui permet de récupérer rapidement la valeur si l'on connaît la clé (comme chercher la définition d'un mot dans un dictionnaire).
    *   **Définition et Création :** On définit un dictionnaire en plaçant les paires `clé: valeur` séparées par des virgules entre accolades `{}`.
        ```python
        personne = {
            "nom": "Dupont",
            "prenom": "Jean",
            "age": 45,
            "ville": "Paris"
        }
        scores = {"maths": 15, "anglais": 12, "histoire": 17}
        dict_vide = {}

        print(personne)
        print(scores)
        print(type(personne)) # Affiche : <class 'dict'>
        ```
    *   **Accès aux Valeurs par Clé :**
        ```python
        print(personne["nom"])    # Affiche : Dupont
        print(scores["anglais"]) # Affiche : 12
        # print(personne["profession"]) # Erreur : KeyError, car la clé "profession" n'existe pas
        ```
    *   **Ajout, Modification et Suppression d'Éléments :**
        ```python
        # Ajout d'une nouvelle paire clé-valeur
        personne["profession"] = "Ingénieur"
        print(personne) # 'profession': 'Ingénieur' a été ajouté

        # Modification d'une valeur existante
        personne["age"] = 46
        print(personne) # l'âge est maintenant 46

        # Suppression d'une paire clé-valeur avec del
        del personne["ville"]
        print(personne) # 'ville': 'Paris' a été supprimé

        # Suppression avec .pop(clé) - retourne la valeur supprimée
        score_maths = scores.pop("maths")
        print(score_maths) # Affiche : 15
        print(scores)      # 'maths': 15 a été supprimé
        ```
    *   **Méthodes Courantes des Dictionnaires :**
        ```python
        contact = {"nom": "Alice", "telephone": "0123456789"}

        # len() : obtenir le nombre de paires clé-valeur
        print(len(contact)) # Affiche : 2

        # .keys() : obtenir une vue des clés
        print(contact.keys())   # Affiche : dict_keys(['nom', 'telephone'])
        # Pour obtenir une liste des clés : list(contact.keys())

        # .values() : obtenir une vue des valeurs
        print(contact.values()) # Affiche : dict_values(['Alice', '0123456789'])

        # .items() : obtenir une vue des paires (clé, valeur) sous forme de tuples
        print(contact.items())  # Affiche : dict_items([('nom', 'Alice'), ('telephone', '0123456789')])

        # .get(clé, valeur_par_defaut) : obtenir la valeur d'une clé,
        # mais renvoie None (ou une valeur par défaut spécifiée) si la clé n'existe pas,
        # au lieu de lever une KeyError.
        print(contact.get("email")) # Affiche : None
        print(contact.get("email", "non renseigné")) # Affiche : non renseigné
        print(contact.get("nom")) # Affiche : Alice
        ```

*   **Tuples (`tuple`)**
    Un tuple est une collection ordonnée et **immuable** (non modifiable) d'éléments. Une fois qu'un tuple est créé, vous ne pouvez pas changer ses éléments, ni en ajouter ou en supprimer.

    *   **Définition et Création :** On définit un tuple en plaçant les éléments séparés par des virgules entre parenthèses `()`. Les parenthèses sont parfois optionnelles si le contexte est clair.
        ```python
        coordonnees = (10.0, 20.5)
        couleurs_rgb = ("rouge", "vert", "bleu")
        tuple_un_element = (5,) # Notez la virgule pour distinguer d'une simple expression entre parenthèses
        tuple_vide = ()

        print(coordonnees)
        print(couleurs_rgb)
        print(type(coordonnees)) # Affiche : <class 'tuple'>

        # Parenthèses optionnelles dans certains contextes
        point = 3, 4
        print(point) # Affiche : (3, 4)
        ```
    *   **Immuabilité :** C'est la différence clé avec les listes.
        ```python
        # couleurs_rgb[0] = "rose" # Erreur : TypeError: 'tuple' object does not support item assignment
        ```
        Pourquoi utiliser des tuples s'ils sont moins flexibles que les listes ?
        *   **Sécurité :** Les données ne peuvent pas être modifiées accidentellement.
        *   **Performance :** Les tuples peuvent être légèrement plus rapides que les listes pour certaines opérations car Python sait qu'ils ne changeront pas.
        *   **Clés de Dictionnaire :** Comme ils sont immuables, les tuples peuvent être utilisés comme clés dans les dictionnaires (contrairement aux listes).
    *   **Cas d'Utilisation :**
        *   Représenter des collections figées d'éléments (ex: coordonnées, couleurs RGB, dates).
        *   Retour multiple de fonctions : une fonction peut retourner plusieurs valeurs sous forme d'un tuple.
            ```python
            def obtenir_nom_et_age():
                return "Alice", 30 # Retourne implicitement le tuple ("Alice", 30)

            infos = obtenir_nom_et_age()
            nom_recup = infos[0]
            age_recup = infos[1]
            print(f"{nom_recup} a {age_recup} ans.")

            # On peut aussi "dépaqueter" le tuple directement :
            nom_direct, age_direct = obtenir_nom_et_age()
            print(f"{nom_direct} a {age_direct} ans.")
            ```
        *   L'indexation et le découpage fonctionnent comme pour les listes.
            ```python
            print(coordonnees[0]) # Affiche : 10.0
            print(couleurs_rgb[1:]) # Affiche : ('vert', 'bleu')
            ```

*   **Ensembles (`set`)** (Optionnel, mais utile à connaître)
    Un ensemble est une collection non ordonnée d'éléments **uniques** et immuables (les éléments eux-mêmes doivent être immuables, comme des nombres, des chaînes, des tuples). Les ensembles sont utiles pour tester l'appartenance, éliminer les doublons ou effectuer des opérations mathématiques sur les ensembles.

    *   **Définition et Création :** On définit un ensemble en plaçant les éléments séparés par des virgules entre accolades `{}`. Pour créer un ensemble vide, il faut utiliser `set()` car `{}` crée un dictionnaire vide.
        ```python
        chiffres_uniques = {1, 2, 3, 2, 1, 4}
        print(chiffres_uniques) # Affiche : {1, 2, 3, 4} (les doublons sont éliminés, l'ordre peut varier)

        ensemble_vide = set()
        print(type(chiffres_uniques)) # Affiche : <class 'set'>
        ```
    *   **Unicité des Éléments :** C'est la caractéristique principale.
        ```python
        liste_avec_doublons = [1, 2, "a", 3, "b", 2, "a"]
        elements_uniques = set(liste_avec_doublons)
        print(elements_uniques) # Affiche : {1, 2, 3, 'a', 'b'} (converti en ensemble pour unicité)
        liste_sans_doublons = list(elements_uniques) # Reconverti en liste si besoin
        print(liste_sans_doublons)
        ```
    *   **Opérations sur les Ensembles :**
        ```python
        set_a = {1, 2, 3, 4}
        set_b = {3, 4, 5, 6}

        # Union (| ou .union()) : éléments dans A ou dans B ou dans les deux
        print(set_a | set_b)          # Affiche : {1, 2, 3, 4, 5, 6}
        print(set_a.union(set_b))

        # Intersection (& ou .intersection()) : éléments présents à la fois dans A et dans B
        print(set_a & set_b)              # Affiche : {3, 4}
        print(set_a.intersection(set_b))

        # Différence (- ou .difference()) : éléments dans A mais pas dans B
        print(set_a - set_b)                # Affiche : {1, 2}
        print(set_a.difference(set_b))

        # Différence symétrique (^ ou .symmetric_difference()) : éléments dans A ou B, mais pas dans les deux
        print(set_a ^ set_b) # Affiche : {1, 2, 5, 6}
        print(set_a.symmetric_difference(set_b))

        # Ajouter un élément
        set_a.add(5)
        print(set_a) # Affiche : {1, 2, 3, 4, 5}

        # Supprimer un élément (si présent, sinon KeyError)
        set_a.remove(1)
        print(set_a) # Affiche : {2, 3, 4, 5}

        # Supprimer un élément (s'il est présent, sinon ne fait rien)
        set_a.discard(10) # 10 n'est pas dans set_a, aucune erreur
        print(set_a)
        ```

Ce module a couvert beaucoup de terrain ! Les variables vous permettent de nommer et de stocker des données, tandis que les types de données (nombres, chaînes, booléens) et les structures de données (listes, dictionnaires, tuples, ensembles) vous donnent les outils pour représenter et organiser ces informations de manière significative. Entraînez-vous à créer des variables, à manipuler ces différents types et vous serez prêt pour le module suivant sur les opérateurs !
