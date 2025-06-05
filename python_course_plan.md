# Plan de Cours : Introduction à Python

## Module 1: Introduction à Python

*   **Qu'est-ce que Python ?**
    *   Histoire et philosophie de Python.
    *   Caractéristiques principales (lisibilité, polyvalence, grande communauté).
    *   Interprété vs Compilé : explication simple.
*   **Pourquoi utiliser Python ?**
    *   Domaines d'application (développement web, science des données, IA, scripting, etc.).
    *   Avantages par rapport à d'autres langages (pour les débutants).
*   **Installation de Python**
    *   Téléchargement depuis python.org.
    *   Installation sur Windows, macOS et Linux.
    *   Vérification de l'installation (ligne de commande : `python --version` ou `python3 --version`).
    *   Introduction à l'interpréteur interactif Python (REPL).
    *   Choix d'un IDE/éditeur de texte (VS Code, PyCharm Community, Sublime Text, etc.) et configuration de base.

## Module 2: Variables et Types de Données

*   **Variables**
    *   Concept de variable.
    *   Règles de nommage.
    *   Affectation de valeurs.
*   **Types de Données Fondamentaux**
    *   **Nombres :**
        *   Entiers (`int`).
        *   Nombres à virgule flottante (`float`).
        *   Opérations de base.
    *   **Chaînes de caractères (`str`) :**
        *   Définition (guillemets simples, doubles, triples).
        *   Concaténation.
        *   Méthodes courantes (`len()`, `.upper()`, `.lower()`, `.find()`, `.replace()`).
        *   Formatage de chaînes (f-strings, `.format()`).
    *   **Booléens (`bool`) :**
        *   Valeurs `True` et `False`.
        *   Utilisation dans les conditions.
*   **Structures de Données de Base**
    *   **Listes (`list`) :**
        *   Définition et création.
        *   Indexation et découpage (slicing).
        *   Méthodes courantes (`append()`, `insert()`, `remove()`, `pop()`, `sort()`, `len()`).
        *   Listes de listes (introduction aux structures imbriquées).
    *   **Dictionnaires (`dict`) :**
        *   Concept clé-valeur.
        *   Définition et création.
        *   Accès aux valeurs par clé.
        *   Ajout, modification et suppression d'éléments.
        *   Méthodes courantes (`.keys()`, `.values()`, `.items()`, `.get()`).
    *   **Tuples (`tuple`) :**
        *   Définition et création.
        *   Immuabilité (différence clé avec les listes).
        *   Cas d'utilisation (ex: retour multiple de fonctions).
    *   **Ensembles (`set`) :** (Optionnel, mais utile à mentionner)
        *   Définition et création.
        *   Unicité des éléments.
        *   Opérations sur les ensembles (union, intersection).

## Module 3: Opérateurs

*   **Opérateurs Arithmétiques**
    *   Addition (`+`), Soustraction (`-`), Multiplication (`*`), Division (`/`).
    *   Division entière (`//`), Modulo (`%`), Exponentiation (`**`).
    *   Ordre de priorité des opérations.
*   **Opérateurs de Comparaison**
    *   Égal (`==`), Différent (`!=`).
    *   Supérieur (`>`), Inférieur (`<`).
    *   Supérieur ou égal (`>=`), Inférieur ou égal (`<=`).
    *   Retournent des valeurs booléennes.
*   **Opérateurs Logiques**
    *   `and` (ET logique).
    *   `or` (OU logique).
    *   `not` (NON logique).
    *   Utilisation avec des expressions booléennes.
*   **Opérateurs d'Appartenance** (Optionnel, mais utile avec les séquences)
    *   `in`.
    *   `not in`.
*   **Opérateurs d'Identité** (Optionnel, pour une compréhension plus profonde)
    *   `is`.
    *   `is not`.

## Module 4: Structures de Contrôle

*   **Conditions `if`/`elif`/`else`**
    *   Syntaxe et indentation.
    *   Exécution conditionnelle de blocs de code.
    *   Conditions multiples avec `elif`.
    *   Utilisation de l'opérateur ternaire (forme condensée de `if/else`).
*   **Boucles `for`**
    *   Itération sur des séquences (listes, chaînes, tuples, dictionnaires).
    *   Utilisation de `range()` pour générer des séquences de nombres.
    *   Exemples pratiques (parcourir une liste, effectuer une action N fois).
*   **Boucles `while`**
    *   Exécution répétée tant qu'une condition est vraie.
    *   Importance de la condition d'arrêt pour éviter les boucles infinies.
    *   Exemples pratiques (attendre une entrée utilisateur spécifique).
*   **Instructions de Contrôle de Boucle**
    *   `break` : sortir prématurément d'une boucle.
    *   `continue` : passer à l'itération suivante d'une boucle.
    *   `pass` : instruction nulle, utilisée comme placeholder.

## Module 5: Fonctions

*   **Définition d'une Fonction**
    *   Mot-clé `def`.
    *   Nom de la fonction et parenthèses.
    *   Bloc de code indenté.
    *   Docstrings pour documenter les fonctions.
*   **Appel d'une Fonction**
    *   Utilisation du nom de la fonction suivi de parenthèses.
*   **Arguments de Fonction**
    *   Passage d'arguments positionnels.
    *   Passage d'arguments par mot-clé (nommés).
    *   Valeurs par défaut pour les arguments.
    *   Arguments variables (`*args`, `**kwargs`) - introduction.
*   **Valeur de Retour**
    *   Mot-clé `return`.
    *   Retourner une seule valeur.
    *   Retourner plusieurs valeurs (sous forme de tuple).
    *   Fonctions qui ne retournent rien explicitement (retournent `None`).
*   **Portée des Variables (Scope)**
    *   Variables locales (définies à l'intérieur d'une fonction).
    *   Variables globales (définies à l'extérieur des fonctions) - bonnes pratiques d'utilisation.
    *   Mot-clé `global` (à utiliser avec prudence).

## Module 6: Modules et Packages

*   **Qu'est-ce qu'un Module ?**
    *   Fichier `.py` contenant des définitions et des instructions Python.
    *   Avantages : organisation du code, réutilisabilité.
*   **Importation de Modules**
    *   `import nom_module`.
    *   `from nom_module import fonction_specifique`.
    *   `from nom_module import *` (à éviter généralement).
    *   Alias avec `as` (`import math as m`).
*   **Bibliothèque Standard de Python**
    *   Présentation de quelques modules utiles :
        *   **`math`**: fonctions mathématiques (`sqrt`, `sin`, `cos`, `pi`, etc.).
        *   **`random`**: génération de nombres aléatoires (`randint`, `choice`, `shuffle`, etc.).
        *   **`datetime`**: manipulation des dates et heures (`datetime.now()`, `timedelta`, formatage).
        *   **`os`**: interaction avec le système d'exploitation (manipulation de fichiers/dossiers - introduction).
        *   **`sys`**: paramètres et fonctions spécifiques au système (ex: `sys.argv`).
        *   **`json`**: travail avec le format de données JSON.
*   **Packages**
    *   Collection de modules.
    *   Structure de répertoires avec un fichier `__init__.py`.
    *   Comment importer depuis des packages.
*   **Installation de Packages Externes avec `pip`**
    *   Introduction à PyPI (Python Package Index).
    *   Commande `pip install nom_package`.
    *   Commande `pip list` pour voir les packages installés.

## Module 7: Entrées et Sorties

*   **Lire des Entrées Utilisateur**
    *   Fonction `input()`.
    *   Conversion du type de données des entrées (ex: `int(input())`).
*   **Travailler avec des Fichiers**
    *   **Ouverture de Fichiers :**
        *   Fonction `open()`.
        *   Modes d'ouverture (`'r'` pour lecture, `'w'` pour écriture, `'a'` pour ajout, `'b'` pour binaire).
        *   Importance de fermer les fichiers avec `close()`.
    *   **Utilisation du gestionnaire de contexte `with open(...) as ...:`** (meilleure pratique).
    *   **Lecture depuis des Fichiers :**
        *   `.read()` : lire tout le contenu.
        *   `.readline()` : lire une seule ligne.
        *   `.readlines()` : lire toutes les lignes dans une liste.
        *   Itérer sur les lignes d'un fichier.
    *   **Écriture dans des Fichiers :**
        *   `.write()` : écrire une chaîne.
        *   `.writelines()` : écrire une liste de chaînes.
    *   Exemples pratiques (lire des données depuis un fichier CSV simple, sauvegarder des résultats).

## Module 8: Introduction à la Programmation Orientée Objet (POO)

*   **Concepts de Base de la POO**
    *   Pourquoi la POO ? (organisation, réutilisabilité, modélisation du monde réel).
    *   Objets et Classes : analogie (ex: un moule à gâteau est la classe, les gâteaux sont les objets).
*   **Classes**
    *   Définition avec le mot-clé `class`.
    *   Attributs (variables associées à une classe/objet).
    *   Méthodes (fonctions associées à une classe/objet).
*   **Objets (Instances)**
    *   Création d'une instance d'une classe.
    *   Le constructeur `__init__()` (méthode spéciale pour initialiser un objet).
    *   Le paramètre `self` dans les méthodes.
*   **Méthodes**
    *   Définition de méthodes au sein d'une classe.
    *   Appel de méthodes sur des objets.
*   **Héritage (Introduction)**
    *   Concept de classe parente et classe enfant.
    *   Réutilisation et extension de code.
    *   Syntaxe de base de l'héritage.
*   **Encapsulation (Introduction)**
    *   Cacher les détails d'implémentation internes.
    *   Convention de nommage pour les attributs "privés" (ex: `_variable`).
*   *(Note : Ce module est une introduction. Des concepts plus avancés comme le polymorphisme, les méthodes spéciales avancées, etc., sont pour des cours plus avancés.)*

## Module 9: Gestion des Erreurs et Exceptions

*   **Qu'est-ce qu'une Erreur/Exception ?**
    *   Erreurs de syntaxe vs Exceptions (erreurs à l'exécution).
    *   Exemples d'exceptions courantes (`TypeError`, `ValueError`, `IndexError`, `KeyError`, `FileNotFoundError`).
    *   Importance de gérer les exceptions pour créer des programmes robustes.
*   **Le Bloc `try`/`except`**
    *   Syntaxe de base.
    *   Attraper des exceptions spécifiques.
    *   Attraper plusieurs exceptions.
    *   Utilisation d'un `except` générique (avec prudence).
*   **Le Bloc `else` (dans `try`/`except`)**
    *   Code à exécuter si aucune exception n'est levée dans le `try`.
*   **Le Bloc `finally`**
    *   Code à exécuter quoi qu'il arrive (même si une exception est levée ou non, ou si `return`/`break` est utilisé).
    *   Utile pour les opérations de nettoyage (ex: fermer un fichier).
*   **Lever des Exceptions (`raise`)**
    *   Comment déclencher manuellement une exception.
    *   Créer des exceptions personnalisées (introduction).

## Module 10: Bonnes Pratiques et Style de Code

*   **Commentaires**
    *   Commentaires sur une seule ligne (`#`).
    *   Commentaires sur plusieurs lignes (docstrings `"""..."""` ou plusieurs `#`).
    *   Quand et comment commenter (expliquer le "pourquoi", pas le "comment" évident).
*   **Nommage des Variables et Fonctions**
    *   Utiliser des noms descriptifs.
    *   Convention `snake_case` pour les variables et fonctions en Python.
    *   Convention `PascalCase` (ou `CamelCase`) pour les noms de classes.
*   **Indentation**
    *   Rôle crucial de l'indentation en Python (4 espaces recommandés par PEP 8).
    *   Cohérence de l'indentation.
*   **PEP 8 - Guide de Style pour le Code Python**
    *   Introduction à PEP 8.
    *   Principales recommandations (longueur de ligne, importations, espaces blancs, etc.).
    *   Utilisation d'outils de linting (ex: Flake8, Pylint) pour vérifier la conformité.
*   **Lisibilité du Code**
    *   Écrire du code clair et compréhensible.
    *   Découper le code complexe en fonctions plus petites.
    *   Éviter la duplication de code (principe DRY - Don't Repeat Yourself).

## Module 11: Prochaines Étapes et Ressources

*   **Révision des Concepts Clés du Cours**
*   **Où Aller Après Cette Introduction ?**
    *   **Projets Personnels :** La meilleure façon d'apprendre est de pratiquer.
    *   **Domaines Spécifiques :**
        *   Développement Web (Flask, Django).
        *   Science des Données et Analyse (NumPy, Pandas, Matplotlib, Scikit-learn).
        *   Intelligence Artificielle et Machine Learning (TensorFlow, PyTorch).
        *   Développement de Jeux (Pygame).
        *   Automatisation et Scripting.
    *   **Concepts Python plus Avancés :**
        *   Programmation orientée objet avancée (polymorphisme, héritage multiple, décorateurs, générateurs).
        *   Programmation fonctionnelle en Python.
        *   Programmation asynchrone (`asyncio`).
        *   Tests unitaires (`unittest`, `pytest`).
*   **Ressources pour Continuer à Apprendre**
    *   Documentation officielle de Python.
    *   Plateformes d'apprentissage en ligne (Coursera, Udemy, edX, Codecademy, freeCodeCamp).
    *   Livres (ex: "Python Crash Course", "Automate the Boring Stuff with Python").
    *   Communautés en ligne (Stack Overflow, Reddit r/learnpython).
    *   Participer à des projets open source.

## Structure Suggérée pour Chaque Sous-Module :

1.  **Explication théorique** des concepts.
2.  **Exemples de code** clairs et concis.
3.  **Exercices pratiques** pour que l'apprenant mette en application les notions vues.
4.  **Mini-projets** à la fin de chaque module principal pour consolider les acquis.

Ce plan vise à être complet pour un cours d'introduction, en fournissant une base solide pour que les apprenants puissent ensuite explorer des domaines plus spécifiques de Python.
N'hésitez pas si vous souhaitez des ajustements ou des approfondissements sur certaines sections !
