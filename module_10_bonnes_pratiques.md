# Module 10: Bonnes Pratiques et Style de Code

Écrire du code qui fonctionne est une chose, mais écrire du code qui est lisible, compréhensible, maintenable et cohérent en est une autre. Ce module aborde quelques bonnes pratiques et conventions de style en Python, largement inspirées par le guide de style officiel **PEP 8**. Adopter ces pratiques rendra votre code meilleur et facilitera la collaboration avec d'autres développeurs.

## 1. Commentaires

Les commentaires sont des explications ou des annotations dans votre code source. Ils sont ignorés par l'interpréteur Python mais sont cruciaux pour les humains qui lisent le code.

*   **Commentaires sur une Seule Ligne (`#`)**
    Tout ce qui suit un `#` sur une ligne est considéré comme un commentaire.
    ```python
    # Ceci est un commentaire sur une ligne entière
    x = 10 # Ceci est un commentaire en fin de ligne (inline comment)
    ```
    Utilisez les commentaires en fin de ligne avec parcimonie. Il est souvent préférable de mettre le commentaire sur sa propre ligne avant le code qu'il explique.

*   **Commentaires sur Plusieurs Lignes (Docstrings `"""..."""` ou plusieurs `#`)**
    *   **Docstrings (Chaînes de Documentation) :** Comme vu dans le module sur les fonctions, les docstrings sont des chaînes encadrées par des triples guillemets (`"""..."""` ou `'''...'''`). Elles sont utilisées comme la **première instruction** dans un module, une fonction, une classe ou une méthode pour documenter ce qu'ils font.
        ```python
        def ma_fonction(param1, param2):
            """
            Ceci est une docstring qui explique ce que fait ma_fonction.

            Elle peut s'étendre sur plusieurs lignes et décrire les arguments,
            ce qui est retourné, etc.
            """
            # ... code de la fonction ...
            pass
        ```
    *   **Blocs de Commentaires avec `#` :** Pour des commentaires sur plusieurs lignes qui ne sont pas des docstrings (par exemple, pour expliquer un algorithme complexe), utilisez plusieurs lignes commençant par `#`.
        ```python
        # Cette section du code implémente l'algorithme X.
        # Il est important de noter que la condition Y doit être vérifiée
        # avant d'appeler la fonction Z.
        # ... code concerné ...
        ```

*   **Quand et Comment Commenter ?**
    *   **Expliquez le "Pourquoi", pas le "Comment" évident :** Le code lui-même devrait expliquer *comment* il fonctionne (grâce à un bon nommage et une structure claire). Les commentaires devraient expliquer *pourquoi* certaines décisions de conception ont été prises, ou clarifier des parties complexes ou non évidentes.
        ```python
        # Mauvais commentaire (explique le comment évident)
        # i = i + 1 # Incrémente i

        # Bon commentaire (explique le pourquoi)
        # On utilise une tolérance de 0.001 car les mesures ne sont pas exactes
        tolerance = 0.001
        ```
    *   **Gardez les commentaires à jour :** Un commentaire incorrect est pire qu'aucun commentaire. Si vous modifiez le code, assurez-vous de mettre à jour les commentaires correspondants.
    *   **Écrivez des commentaires clairs et concis.**
    *   **Commentez le code avant de l'écrire (parfois) :** Écrire des commentaires ou des pseudo-codes avant d'écrire le code réel peut aider à structurer votre pensée.
    *   **Ne commentez pas du mauvais code, réécrivez-le :** Si le code est tellement compliqué qu'il nécessite beaucoup de commentaires pour être compris, il est probablement préférable de le simplifier.

## 2. Nommage des Variables, Fonctions et Classes

Choisir des noms descriptifs et cohérents est l'une des choses les plus importantes pour la lisibilité du code.

*   **Conventions de Nommage (PEP 8) :**
    *   **Variables :** Utilisez `snake_case` (mots en minuscules séparés par des tirets bas).
        ```python
        nombre_d_etudiants = 30
        total_general = 1050.75
        nom_utilisateur = "alice"
        ```
    *   **Fonctions :** Utilisez `snake_case` également.
        ```python
        def calculer_moyenne(liste_notes):
            pass

        def envoyer_email_confirmation(adresse_email):
            pass
        ```
    *   **Classes :** Utilisez `PascalCase` ou `CapWords` (mots commençant par une majuscule, sans séparateur).
        ```python
        class UtilisateurConnecte:
            pass

        class ConfigurationReseau:
            pass
        ```
    *   **Modules :** Devraient avoir des noms courts, tout en minuscules. Des tirets bas peuvent être utilisés si cela améliore la lisibilité (par exemple, `gestion_utilisateurs.py`).
    *   **Packages :** Devraient avoir des noms courts, tout en minuscules, de préférence sans tiret bas.
    *   **Constantes :** Utilisez `SNAKE_CASE_MAJUSCULES` (tout en majuscules avec des tirets bas). Les constantes sont des variables dont la valeur ne devrait pas changer.
        ```python
        TAUX_TVA = 0.20
        NOMBRE_MAX_CONNEXIONS = 10
        ```
    *   **Attributs "Internes" ou "Protégés" :** Préfixez avec un seul tiret bas (`_mon_attribut_interne`).
    *   **Attributs "Privés" (avec Name Mangling) :** Préfixez avec deux tirets bas (`__mon_attribut_prive`).

*   **Utiliser des Noms Descriptifs**
    *   Évitez les noms à une seule lettre (sauf pour des compteurs très simples comme `i`, `j`, `k` dans des boucles courtes, ou `x`, `y`, `z` pour des coordonnées).
    *   Le nom devrait indiquer clairement ce que la variable représente ou ce que la fonction fait.
    ```python
    # Mauvais
    n = "Alice"
    l = [1, 2, 3]
    def calc(a, b): return a*b

    # Bon
    nom_client = "Alice"
    scores_jeux = [1, 2, 3]
    def calculer_produit(nombre1, nombre2): return nombre1 * nombre2
    ```

## 3. Indentation

*   **Rôle Crucial de l'Indentation en Python**
    Contrairement à de nombreux autres langages qui utilisent des accolades `{}` pour délimiter les blocs de code, Python utilise l'indentation. La quantité d'indentation (espaces ou tabulations) est significative.
*   **PEP 8 Recommande 4 Espaces par Niveau d'Indentation**
    *   N'utilisez **pas** de tabulations, ou si vous le faites, configurez votre éditeur pour qu'il les convertisse en 4 espaces. Mélanger tabulations et espaces dans le même fichier causera des erreurs `TabError`.
    *   La plupart des éditeurs de code modernes peuvent être configurés pour insérer automatiquement 4 espaces lorsque vous appuyez sur la touche Tab.

    ```python
    # Indentation correcte
    def ma_fonction_bien_indentee(param):
        if param > 10:
            print("Le paramètre est supérieur à 10.")
            for i in range(param):
                print(f"Itération {i}")
        else:
            print("Le paramètre est inférieur ou égal à 10.")
        return True # Alignée avec le if/else, donc fait partie de la fonction

    # Erreur d'indentation (IndentationError)
    # def ma_fonction_mal_indentee():
    # print("Problème ici") # Cette ligne n'est pas correctement indentée
    ```
*   **Cohérence de l'Indentation**
    Soyez cohérent. Si vous commencez avec 4 espaces, continuez avec 4 espaces.

## 4. PEP 8 - Guide de Style pour le Code Python

PEP signifie "Python Enhancement Proposal". PEP 8 est un document qui fournit des conventions pour l'écriture de code Python lisible et cohérent. Il est fortement recommandé de le lire et de s'y conformer autant que possible. Vous pouvez le trouver en cherchant "PEP 8" sur internet.

*   **Introduction à PEP 8**
    PEP 8 couvre de nombreux aspects du style de code, y compris (mais sans s'y limiter) :
    *   Nommage (déjà abordé)
    *   Indentation (déjà abordé)
    *   Longueur des lignes
    *   Mise en page (lignes vides)
    *   Importations
    *   Espaces blancs dans les expressions et les instructions
    *   Commentaires

*   **Principales Recommandations (en plus de celles déjà vues) :**
    *   **Longueur des Lignes :** Limitez toutes les lignes à un maximum de 79 caractères. Pour les longues chaînes de documentation ou les commentaires, limitez à 72 caractères.
        *   Cela améliore la lisibilité, surtout avec plusieurs fenêtres ouvertes côte à côte.
        *   Utilisez des parenthèses, des crochets ou des accolades pour envelopper de longues instructions sur plusieurs lignes (continuation implicite de ligne), ou le caractère de continuation de ligne `\` (moins préféré).
            ```python
            def fonction_avec_beaucoup_d_arguments(arg1, arg2, arg3, arg4, arg5,
                                                  arg6, arg7): # Alignement vertical
                pass

            revenu_total = (revenus_mois_1 + revenus_mois_2 + revenus_mois_3 +
                            revenus_mois_4 - depenses_totales)
            ```
    *   **Lignes Vides :**
        *   Utilisez deux lignes vides pour séparer les définitions de fonctions de haut niveau et les définitions de classes.
        *   Utilisez une ligne vide pour séparer les méthodes à l'intérieur d'une classe.
        *   Utilisez des lignes vides avec parcimonie à l'intérieur des fonctions pour indiquer des blocs logiques.
    *   **Importations :**
        *   Les importations doivent généralement être sur des lignes séparées :
            ```python
            # Recommandé
            import os
            import sys

            # Non recommandé
            # import os, sys
            ```
        *   L'ordre des importations devrait être :
            1.  Modules de la bibliothèque standard (ex: `os`, `sys`, `math`).
            2.  Modules tiers (installés via `pip`, ex: `requests`, `numpy`).
            3.  Modules de votre propre application/projet.
            Séparez chaque groupe par une ligne vide.
            ```python
            import math
            import os

            import requests # Supposons que c'est un package tiers

            from . import mon_module_local # Importation relative locale
            from mon_projet_package import autre_module
            ```
    *   **Espaces Blancs dans les Expressions et Instructions :**
        *   Évitez les espaces superflus.
        *   Utilisez des espaces autour des opérateurs binaires (`=`, `+=`, `==`, `<`, `+`, `-`, `*`, `/`, `and`, `or`, etc.), mais pas directement à l'intérieur des parenthèses, crochets ou accolades.
            ```python
            # Recommandé
            x = 5
            y = x + 2
            ma_liste[0] = valeur
            if x > 0 and y < 10:
                pass

            # Non recommandé
            x=5
            y = x+2
            ma_liste [ 0 ] = valeur
            if x>0 and y<10:
                pass
            ```
        *   Pas d'espace avant une virgule, un deux-points ou un point-virgule. Mettez un espace après (sauf si c'est en fin de ligne).
            ```python
            print(x, y) # Espace après la virgule
            mon_dict = {"cle": "valeur"} # Pas d'espace avant ':', espace après
            ```
    *   **Encodage des Fichiers :** Utilisez UTF-8 (par défaut en Python 3) ou ASCII pour vos fichiers Python.

*   **Utilisation d'Outils de Linting et de Formatage**
    *   **Linters :** Ce sont des outils qui analysent votre code et signalent les erreurs de style (non-conformité à PEP 8), les erreurs de programmation potentielles, et les "code smells".
        *   Exemples : `Flake8` (combine PyFlakes, pycodestyle (anciennement pep8), et McCabe), `Pylint` (plus complet mais parfois plus verbeux).
    *   **Formatters :** Ces outils reforment automatiquement votre code pour qu'il respecte un style défini (souvent PEP 8).
        *   Exemples : `Black`, `autopep8`, `YAPF` (Yet Another Python Formatter de Google).
    *   Beaucoup d'IDE (comme VS Code, PyCharm) intègrent ces outils ou permettent de les configurer facilement. Ils peuvent vérifier votre code pendant que vous tapez ou lors de la sauvegarde.
    *   Utiliser ces outils aide grandement à maintenir un style de code cohérent, surtout dans les projets d'équipe.

## 5. Lisibilité du Code et Principe DRY

*   **Écrire du Code Clair et Compréhensible**
    *   Votre code devrait être aussi facile à lire que possible. Pensez à la personne qui lira votre code ensuite (ce pourrait être vous-même dans 6 mois !).
    *   Utilisez des noms de variables et de fonctions clairs et significatifs.
    *   Décomposez les problèmes complexes en fonctions plus petites et bien définies. Une fonction devrait idéalement faire une seule chose et la faire bien.
    *   Évitez les imbrications excessives de boucles et de conditions `if`. Si votre code a trop de niveaux d'indentation, c'est souvent un signe qu'il peut être simplifié ou refactorisé (réorganisé).

*   **Principe DRY (Don't Repeat Yourself - Ne Vous Répétez Pas)**
    *   Si vous vous retrouvez à écrire le même bloc de code (ou un bloc très similaire) à plusieurs endroits, c'est un signe que vous devriez probablement le mettre dans une fonction.
    *   La duplication de code rend la maintenance plus difficile : si vous devez corriger un bug ou faire une modification, vous devrez le faire à plusieurs endroits, avec le risque d'en oublier.
    *   Les fonctions, les classes et les modules sont des outils pour éviter la répétition.

Adopter de bonnes pratiques de codage et un style cohérent demande un effort conscient au début, mais cela devient rapidement une seconde nature. Les bénéfices en termes de lisibilité, de maintenabilité et de collaboration en valent largement la peine. PEP 8 est votre ami !
