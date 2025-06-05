# Module 6: Modules et Packages

À mesure que vos programmes deviennent plus grands et plus complexes, il devient essentiel de les organiser. En Python, les **modules** et les **packages** sont les principaux outils pour structurer votre code, le rendre réutilisable et éviter les conflits de noms.

## 1. Modules

*   **Concept de Module**
    *   Un module est simplement un fichier Python (avec une extension `.py`) qui contient des définitions (fonctions, classes, variables) et des instructions Python.
    *   Les modules vous permettent de diviser votre code en plusieurs fichiers logiques. Par exemple, vous pourriez avoir un module pour gérer les utilisateurs, un autre pour les produits, etc.
    *   **Avantages :**
        *   **Organisation :** Rend le code plus facile à gérer et à comprendre.
        *   **Réutilisabilité :** Les fonctions et classes définies dans un module peuvent être utilisées dans d'autres parties de votre programme ou même dans d'autres programmes.
        *   **Espace de noms :** Chaque module a son propre espace de noms (namespace), ce qui aide à éviter les conflits entre des noms de variables ou de fonctions identiques définis dans différents modules.

*   **Création d'un Module (Exemple)**
    Supposons que nous créons un fichier nommé `mon_module_math.py` avec le contenu suivant :

    ```python
    # Fichier : mon_module_math.py

    PI = 3.14159

    def addition(a, b):
        """Retourne la somme de a et b."""
        return a + b

    def soustraction(a, b):
        """Retourne la différence entre a et b."""
        return a - b

    class Calculatrice:
        def multiplier(self, x, y):
            return x * y
    ```
    Ce fichier `mon_module_math.py` est maintenant un module.

*   **Importation de Modules**
    Pour utiliser les définitions d'un module dans un autre fichier Python (ou dans l'interpréteur interactif), vous devez l'importer. Il existe plusieurs façons d'importer :

    1.  **`import nom_module`**
        Importe le module entier. Vous devez ensuite préfixer les noms des fonctions, classes ou variables du module avec `nom_module.` pour y accéder.

        ```python
        # Fichier : script_principal.py (doit être dans le même dossier que mon_module_math.py pour cet exemple simple)
        import mon_module_math

        resultat_add = mon_module_math.addition(10, 5)
        print(f"Addition : {resultat_add}") # Addition : 15

        print(f"Valeur de PI : {mon_module_math.PI}") # Valeur de PI : 3.14159

        calc = mon_module_math.Calculatrice()
        resultat_mult = calc.multiplier(4, 6)
        print(f"Multiplication : {resultat_mult}") # Multiplication : 24
        ```

    2.  **`from nom_module import element_specifique`**
        Importe uniquement un ou plusieurs éléments spécifiques (fonction, classe, variable) d'un module. Vous pouvez alors utiliser ces éléments directement sans le préfixe du nom du module.

        ```python
        # Fichier : script_principal_v2.py
        from mon_module_math import addition, PI # Importe seulement addition et PI

        resultat_add_v2 = addition(20, 7) # Pas besoin de mon_module_math.
        print(f"Addition v2 : {resultat_add_v2}") # Addition v2 : 27
        print(f"PI directement : {PI}") # PI directement : 3.14159

        # soustraction(10, 2) # Erreur : NameError, soustraction n'est pas directement importée
        # Pour l'utiliser, il faudrait l'importer ou utiliser mon_module_math.soustraction si on a fait 'import mon_module_math'
        ```
        Vous pouvez importer plusieurs éléments : `from mon_module_math import addition, soustraction, Calculatrice`

    3.  **`from nom_module import *`**
        Importe tous les noms définis dans un module directement dans l'espace de noms courant.
        **Cette méthode est généralement déconseillée** car elle peut polluer votre espace de noms et rendre difficile de savoir d'où vient une fonction ou une variable, surtout si plusieurs modules importés de cette manière ont des noms identiques. Elle peut aussi masquer des noms que vous avez définis vous-même.

        ```python
        # Fichier : script_principal_v3.py (utilisation déconseillée)
        # from mon_module_math import *

        # resultat_add_v3 = addition(50, 50) # Fonctionne, mais d'où vient 'addition' ?
        # print(f"PI sans préfixe : {PI}")    # Fonctionne aussi
        # calc_v3 = Calculatrice()
        ```

    4.  **Alias avec `as`**
        Vous pouvez donner un alias (un nom plus court ou différent) à un module ou à un élément importé. C'est utile pour éviter les conflits de noms ou pour raccourcir des noms de modules longs.

        ```python
        # Fichier : script_principal_v4.py
        import mon_module_math as mmm # 'mmm' est un alias pour 'mon_module_math'

        res_add = mmm.addition(3, 4)
        print(f"Addition avec alias module : {res_add}")

        from mon_module_math import soustraction as diff # 'diff' est un alias pour 'soustraction'
        res_diff = diff(10, 3)
        print(f"Soustraction avec alias fonction : {res_diff}")
        ```

*   **L'instruction `if __name__ == "__main__":`**
    Vous verrez souvent ce bloc de code dans les modules Python :
    ```python
    # Fichier : mon_module_math.py (ajout à la fin)

    # ... (définitions de PI, addition, soustraction, Calculatrice) ...

    if __name__ == "__main__":
        # Ce code ne s'exécute que si le module est exécuté directement
        # (par exemple, en lançant 'python mon_module_math.py' dans le terminal)
        # Il ne s'exécute PAS si le module est importé par un autre script.
        print("Mon_module_math est exécuté directement.")
        test_result = addition(5, 5)
        print(f"Test d'addition dans le module : {test_result}")
    ```
    *   Chaque module en Python a une variable spéciale intégrée appelée `__name__`.
    *   Si le fichier est exécuté directement, Python assigne la valeur `__main__` à `__name__`.
    *   Si le fichier est importé dans un autre module, `__name__` prend la valeur du nom du module (ici, `mon_module_math`).
    *   Cela permet d'inclure du code de test ou des actions spécifiques (comme une démonstration des fonctionnalités du module) qui ne s'exécuteront que lorsque le module est le script principal, et non lorsqu'il est simplement importé pour utiliser ses fonctions/classes.

## 2. Bibliothèque Standard de Python

Python est livré avec une "bibliothèque standard" très riche, qui est une collection de modules fournissant un large éventail de fonctionnalités prêtes à l'emploi. Vous n'avez pas besoin d'installer quoi que ce soit de plus pour les utiliser, juste les importer.

Voici quelques modules très utiles de la bibliothèque standard :

*   **`math` : Fonctions Mathématiques**
    Fournit des fonctions mathématiques pour les nombres à virgule flottante.
    ```python
    import math

    print(math.pi)            # Constante pi : 3.141592653589793
    print(math.e)             # Constante e (base du logarithme naturel)
    print(math.sqrt(25))      # Racine carrée : 5.0
    print(math.pow(2, 3))     # Puissance (2^3) : 8.0
    print(math.sin(math.radians(90))) # Sinus (angle en radians) : 1.0 (approx.)
    print(math.cos(0))        # Cosinus : 1.0
    print(math.log10(100))    # Logarithme base 10 : 2.0
    print(math.floor(3.7))    # Arrondi à l'entier inférieur : 3
    print(math.ceil(3.2))     # Arrondi à l'entier supérieur : 4
    ```

*   **`random` : Génération de Nombres Aléatoires**
    Permet de générer des nombres pseudo-aléatoires, de faire des choix aléatoires, etc.
    ```python
    import random

    print(random.random())        # Nombre flottant aléatoire entre 0.0 (inclus) et 1.0 (exclus)
    print(random.randint(1, 10))  # Entier aléatoire entre 1 et 10 (inclus)
    print(random.uniform(1.0, 5.0))# Flottant aléatoire entre 1.0 et 5.0

    ma_liste = ["pomme", "banane", "cerise", "datte"]
    print(random.choice(ma_liste)) # Choisit un élément aléatoire de la liste
    random.shuffle(ma_liste)      # Mélange la liste sur place
    print(f"Liste mélangée : {ma_liste}")
    ```

*   **`datetime` : Manipulation des Dates et Heures**
    Fournit des classes pour travailler avec les dates, les heures et les intervalles de temps.
    ```python
    import datetime

    maintenant = datetime.datetime.now() # Date et heure actuelles
    print(f"Maintenant : {maintenant}")
    print(f"Année : {maintenant.year}")
    print(f"Mois : {maintenant.month}")
    print(f"Jour : {maintenant.day}")
    print(f"Heure : {maintenant.hour}:{maintenant.minute}:{maintenant.second}")

    aujourdhui = datetime.date.today()
    print(f"Aujourd'hui (date) : {aujourdhui}")

    # Créer une date spécifique
    anniversaire = datetime.date(2024, 12, 25)
    print(f"Anniversaire : {anniversaire}")

    # Formater une date en chaîne
    print(maintenant.strftime("%d/%m/%Y %H:%M:%S")) # Format JJ/MM/AAAA HH:MM:SS

    # Calculs de temps
    demain = aujourdhui + datetime.timedelta(days=1)
    print(f"Demain : {demain}")
    ```

*   **`os` : Interaction avec le Système d'Exploitation**
    Fournit des fonctions pour interagir avec le système d'exploitation, comme manipuler des chemins de fichiers, des dossiers, exécuter des commandes, etc.
    ```python
    import os

    print(f"Répertoire courant : {os.getcwd()}") # Get Current Working Directory

    # os.mkdir("mon_nouveau_dossier") # Crée un nouveau dossier (attention si déjà existant)
    # print(f"Contenu du répertoire courant : {os.listdir('.')}") # '.' signifie répertoire courant

    chemin_fichier = "/chemin/vers/un/fichier.txt" # Exemple
    print(f"Nom de base : {os.path.basename(chemin_fichier)}") # fichier.txt
    print(f"Nom du répertoire : {os.path.dirname(chemin_fichier)}") # /chemin/vers/un
    print(f"Existe ? {os.path.exists(chemin_fichier)}") # Vérifie si un chemin existe

    # Pour créer des chemins indépendants de l'OS (Windows utilise '\', Linux/macOS utilise '/')
    chemin_complet = os.path.join("dossier1", "sous_dossier", "fichier.txt")
    print(f"Chemin construit : {chemin_complet}") # dossier1/sous_dossier/fichier.txt (ou avec \ sous Windows)
    ```

*   **`sys` : Paramètres et Fonctions Spécifiques au Système**
    Permet d'accéder à des variables et fonctions maintenues par l'interpréteur Python lui-même.
    ```python
    import sys

    print(f"Version de Python : {sys.version}")
    print(f"Plateforme : {sys.platform}") # ex: 'win32', 'linux', 'darwin' (pour macOS)
    # print(f"Arguments de la ligne de commande : {sys.argv}") # sys.argv[0] est le nom du script
    # sys.exit("Message d'erreur et sortie du script") # Arrête le script
    ```

*   **`json` : Travail avec le Format de Données JSON**
    JSON (JavaScript Object Notation) est un format léger d'échange de données, très utilisé sur le web. Le module `json` permet de convertir des objets Python en chaînes JSON (sérialisation) et des chaînes JSON en objets Python (désérialisation).
    ```python
    import json

    # Dictionnaire Python
    donnees_python = {
        "nom": "Alice",
        "age": 30,
        "ville": "Paris",
        "competences": ["Python", "SQL", "Communication"],
        "active": True
    }

    # Sérialisation : Python -> JSON (chaîne)
    json_string = json.dumps(donnees_python, indent=4) # indent pour une jolie impression
    print("Chaîne JSON :")
    print(json_string)

    # Désérialisation : JSON (chaîne) -> Python
    json_data_recu = '{"nom": "Bob", "age": 25, "estEtudiant": false, "cours": null}'
    objet_python_recu = json.loads(json_data_recu)
    print("\nObjet Python (depuis JSON) :")
    print(objet_python_recu)
    print(f"Nom de l'objet reçu : {objet_python_recu['nom']}") # Accès comme un dictionnaire
    ```

Il existe de nombreux autres modules dans la bibliothèque standard (par exemple `csv` pour les fichiers CSV, `re` pour les expressions régulières, `http.client` pour les requêtes HTTP, etc.). La documentation officielle de Python est le meilleur endroit pour les explorer.

## 3. Packages

*   **Concept de Package**
    *   Lorsque votre application devient très grande, vous pouvez avoir de nombreux modules. Pour mieux les organiser, vous pouvez les regrouper dans des **packages**.
    *   Un package est essentiellement un dossier qui contient d'autres modules (fichiers `.py`) et potentiellement d'autres sous-dossiers (qui sont alors des sous-packages).
    *   Pour qu'un dossier soit reconnu par Python comme un package, il **doit contenir un fichier spécial nommé `__init__.py`**. Ce fichier peut être vide, mais sa présence indique à Python que le dossier est un package. Il peut aussi contenir du code d'initialisation pour le package ou définir la variable `__all__` (pour contrôler ce qui est importé avec `from package import *`).

*   **Structure d'un Package (Exemple)**
    ```
    mon_projet/
    ├── script_principal.py
    └── mon_grand_package/
        ├── __init__.py
        ├── module_A.py
        ├── module_B.py
        └── sous_package_X/
            ├── __init__.py
            └── module_C.py
    ```
    Dans cet exemple :
    *   `mon_grand_package` est un package.
    *   `module_A.py` et `module_B.py` sont des modules dans `mon_grand_package`.
    *   `sous_package_X` est un sous-package de `mon_grand_package`.
    *   `module_C.py` est un module dans `sous_package_X`.

*   **Importation depuis des Packages**
    On utilise la notation avec des points (`.`) pour naviguer dans la hiérarchie du package.

    ```python
    # Dans script_principal.py :

    # Importer un module entier du package
    # import mon_grand_package.module_A
    # mon_grand_package.module_A.fonction_de_A()

    # Importer un élément spécifique d'un module du package
    # from mon_grand_package.module_A import fonction_de_A
    # fonction_de_A()

    # Importer un module d'un sous-package
    # import mon_grand_package.sous_package_X.module_C as modC
    # modC.fonction_de_C()

    # Importer un élément spécifique d'un module d'un sous-package
    # from mon_grand_package.sous_package_X.module_C import fonction_de_C
    # fonction_de_C()
    ```
    (Pour que ces imports fonctionnent, `mon_projet` doit être dans le `PYTHONPATH` ou être le répertoire courant, et les fichiers `__init__.py` doivent exister).

## 4. Installation de Packages Externes avec `pip`

La bibliothèque standard est puissante, mais l'écosystème Python est rendu encore plus riche par des milliers de packages tiers créés par la communauté. Ces packages sont hébergés sur **PyPI (Python Package Index)**, le dépôt officiel de logiciels pour Python.

L'outil `pip` est le gestionnaire de paquets standard pour Python. Il permet de télécharger et d'installer des packages depuis PyPI. `pip` est généralement inclus avec les installations modernes de Python.

*   **Commandes `pip` de Base (à exécuter dans votre terminal/invite de commandes, pas dans l'interpréteur Python)**

    *   **Installer un package :**
        ```bash
        pip install nom_du_package
        ```
        Par exemple, pour installer la populaire bibliothèque `requests` (pour faire des requêtes HTTP) :
        ```bash
        pip install requests
        ```
        Pour installer une version spécifique :
        ```bash
        pip install requests==2.25.1
        ```

    *   **Désinstaller un package :**
        ```bash
        pip uninstall nom_du_package
        ```

    *   **Lister les packages installés :**
        ```bash
        pip list
        ```
        Cela montre tous les packages installés dans votre environnement Python actuel, ainsi que leur version.

    *   **Afficher les informations sur un package installé :**
        ```bash
        pip show nom_du_package
        ```

    *   **Mettre à jour un package :**
        ```bash
        pip install --upgrade nom_du_package
        ```

    *   **Geler les dépendances (créer un fichier `requirements.txt`) :**
        Il est courant de sauvegarder la liste des dépendances d'un projet dans un fichier `requirements.txt`.
        ```bash
        pip freeze > requirements.txt
        ```
        Ce fichier peut ensuite être utilisé par d'autres développeurs (ou par vous-même dans un autre environnement) pour installer toutes les dépendances nécessaires en une seule fois :
        ```bash
        pip install -r requirements.txt
        ```

*   **Environnements Virtuels (Fortement Recommandé)**
    Lorsque vous travaillez sur plusieurs projets Python, ils peuvent avoir des dépendances différentes, voire des versions conflictuelles du même package. Pour éviter cela, il est fortement recommandé d'utiliser des **environnements virtuels**.
    Un environnement virtuel est un répertoire isolé qui contient une installation Python spécifique et ses propres packages, indépendamment de l'installation Python globale et des autres environnements.

    *   **Création d'un environnement virtuel (Python 3.3+) :**
        Naviguez jusqu'au dossier de votre projet dans le terminal, puis :
        ```bash
        python -m venv nom_de_lenvironnement  # Par exemple : python -m venv .venv
        ```
        Cela crée un dossier `nom_de_lenvironnement` (ou `.venv`) contenant l'environnement.

    *   **Activation de l'environnement virtuel :**
        *   Sous Windows (cmd.exe) :
            ```bash
            nom_de_lenvironnement\Scripts\activate.bat
            ```
        *   Sous Windows (PowerShell) :
            ```bash
            nom_de_lenvironnement\Scripts\Activate.ps1
            ```
            (Vous pourriez avoir besoin d'exécuter `Set-ExecutionPolicy Unrestricted -Scope Process` si les scripts sont désactivés)
        *   Sous macOS et Linux (bash/zsh) :
            ```bash
            source nom_de_lenvironnement/bin/activate
            ```
        Une fois activé, votre invite de commande affichera généralement le nom de l'environnement (ex: `(.venv) C:\Users\...>`).
        Maintenant, lorsque vous utilisez `pip install`, les packages seront installés uniquement dans cet environnement.

    *   **Désactivation de l'environnement virtuel :**
        Tapez simplement dans le terminal :
        ```bash
        deactivate
        ```

L'utilisation de modules, de packages et d'environnements virtuels avec `pip` est essentielle pour développer des applications Python maintenables, organisées et reproductibles.
