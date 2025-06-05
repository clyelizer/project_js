# Module 5: Fonctions

Les fonctions sont un concept fondamental en programmation. Elles permettent de regrouper un bloc de code qui effectue une tâche spécifique et de lui donner un nom. Une fois définie, une fonction peut être "appelée" (exécutée) autant de fois que nécessaire, ce qui rend le code plus organisé, réutilisable et plus facile à comprendre. C'est le principe du "DRY" (Don't Repeat Yourself - Ne vous répétez pas).

## 1. Définition et Appel d'une Fonction

*   **Définition d'une Fonction**
    En Python, on définit une fonction avec le mot-clé `def`, suivi du nom de la fonction, de parenthèses `()`, et d'un double-point `:`. Le code à l'intérieur de la fonction doit être indenté.

    ```python
    def saluer():
        # Ceci est le corps de la fonction
        print("Bonjour !")
        print("Bienvenue dans le cours Python.")

    def afficher_ligne_separation():
        print("--------------------")
    ```

*   **Appel d'une Fonction**
    Pour exécuter le code à l'intérieur d'une fonction, on l'appelle en utilisant son nom suivi de parenthèses.

    ```python
    saluer()  # Appelle la fonction saluer. Affiche "Bonjour !" et "Bienvenue..."
    afficher_ligne_separation() # Appelle la fonction pour afficher une ligne
    saluer()  # On peut appeler la fonction plusieurs fois
    ```
    L'avantage est que si vous devez modifier le message de salutation, vous ne le faites qu'à un seul endroit (dans la définition de la fonction `saluer`).

## 2. Arguments de Fonction

Souvent, une fonction a besoin d'informations pour effectuer sa tâche. Ces informations sont passées à la fonction sous forme d'**arguments** (aussi appelés paramètres).

*   **Arguments Positionnels**
    Les arguments sont listés entre les parenthèses dans la définition de la fonction. Lorsque vous appelez la fonction, vous fournissez les valeurs pour ces arguments dans le même ordre.

    ```python
    def saluer_personne(nom): # 'nom' est un paramètre
        print(f"Bonjour, {nom} !")

    saluer_personne("Alice")    # "Alice" est un argument passé au paramètre 'nom'
    saluer_personne("Bob")      # "Bob" est un argument passé au paramètre 'nom'

    def additionner(a, b): # 'a' et 'b' sont des paramètres
        resultat = a + b
        print(f"{a} + {b} = {resultat}")

    additionner(5, 3)       # 5 est pour 'a', 3 est pour 'b'
    additionner(10.5, 2.2)
    # additionner(5) # Erreur : TypeError, il manque un argument positionnel ('b')
    ```

*   **Arguments par Mot-Clé (Nommés)**
    Vous pouvez aussi passer des arguments en spécifiant le nom du paramètre auquel vous affectez la valeur. Cela rend le code plus lisible, surtout avec plusieurs arguments, et l'ordre n'a plus d'importance.

    ```python
    def decrire_animal(type_animal, nom_animal):
        print(f"J'ai un {type_animal} qui s'appelle {nom_animal}.")

    decrire_animal("chien", "Max") # Positionnel
    decrire_animal(nom_animal="Milou", type_animal="chien") # Par mot-clé, ordre différent
    decrire_animal(type_animal="chat", nom_animal="Garfield") # Par mot-clé
    ```

*   **Valeurs par Défaut pour les Arguments**
    Vous pouvez assigner une valeur par défaut à un ou plusieurs paramètres dans la définition de la fonction. Si un argument n'est pas fourni lors de l'appel pour un paramètre avec une valeur par défaut, cette valeur par défaut est utilisée.
    **Important :** Les paramètres avec des valeurs par défaut doivent venir après les paramètres sans valeur par défaut.

    ```python
    def saluer_avec_message(nom, message="Bienvenue !"): # 'message' a une valeur par défaut
        print(f"Bonjour {nom}, {message}")

    saluer_avec_message("Claire") # Utilise le message par défaut
    # Sortie : Bonjour Claire, Bienvenue !

    saluer_avec_message("David", "Comment vas-tu ?") # Fournit une valeur pour 'message'
    # Sortie : Bonjour David, Comment vas-tu ?

    # def mauvais_exemple(message="Salut", nom): # Erreur de syntaxe
    #     print(f"{message}, {nom}")
    ```

*   **Arguments Variables : `*args` (Introduction)**
    Parfois, vous ne savez pas à l'avance combien d'arguments positionnels une fonction pourrait recevoir. `*args` permet de passer un nombre variable d'arguments positionnels. Ces arguments sont regroupés dans un **tuple**.
    Le nom `args` est une convention, vous pourriez utiliser `*nombres` par exemple. L'important est l'astérisque `*`.

    ```python
    def additionner_plusieurs(*nombres): # 'nombres' sera un tuple
        print(type(nombres)) # <class 'tuple'>
        somme = 0
        for nombre in nombres:
            somme += nombre
        print(f"La somme est : {somme}")

    additionner_plusieurs(1, 2, 3)       # Sortie : La somme est : 6
    additionner_plusieurs(10, 20, 30, 40, 50) # Sortie : La somme est : 150
    additionner_plusieurs()              # Sortie : La somme est : 0
    ```

*   **Arguments Variables par Mot-Clé : `**kwargs` (Introduction)**
    De même, `**kwargs` permet de passer un nombre variable d'arguments par mot-clé. Ces arguments sont regroupés dans un **dictionnaire**.
    Le nom `kwargs` (keyword arguments) est une convention. L'important est le double astérisque `**`.

    ```python
    def afficher_infos_personne(**details): # 'details' sera un dictionnaire
        print(type(details)) # <class 'dict'>
        print("Informations sur la personne :")
        for cle, valeur in details.items():
            print(f"- {cle}: {valeur}")

    afficher_infos_personne(nom="Eve", age=28, ville="Lyon")
    # Sortie :
    # Informations sur la personne :
    # - nom: Eve
    # - age: 28
    # - ville: Lyon

    afficher_infos_personne(nom="Frank", profession="Musicien", pays="France", hobby="Lecture")
    # Sortie :
    # Informations sur la personne :
    # - nom: Frank
    # - profession: Musicien
    # - pays: France
    # - hobby: Lecture
    ```
    On peut combiner tous ces types d'arguments dans une fonction, l'ordre général est :
    1.  Arguments positionnels standards
    2.  `*args`
    3.  Arguments par mot-clé standards (ceux avec ou sans valeur par défaut)
    4.  `**kwargs`

    ```python
    def fonction_complexe(arg1, arg2, val_defaut="test", *args, **kwargs):
        print(f"arg1: {arg1}")
        print(f"arg2: {arg2}")
        print(f"val_defaut: {val_defaut}")
        print(f"args: {args}")
        print(f"kwargs: {kwargs}")

    fonction_complexe("val1", "val2", "ma_valeur", 10, 20, nom="Zoe", id=123)
    # arg1: val1
    # arg2: val2
    # val_defaut: ma_valeur
    # args: (10, 20)
    # kwargs: {'nom': 'Zoe', 'id': 123}
    ```

## 3. Valeur de Retour (`return`)

Souvent, une fonction effectue un calcul ou une transformation et doit renvoyer un résultat à la partie du code qui l'a appelée. C'est le rôle de l'instruction `return`.

*   **Retourner une Seule Valeur**
    ```python
    def multiplier(a, b):
        resultat = a * b
        return resultat # La fonction s'arrête ici et renvoie la valeur de 'resultat'

    produit = multiplier(6, 7) # La valeur retournée par multiplier() est stockée dans 'produit'
    print(f"Le produit est : {produit}") # Affiche : Le produit est : 42
    print(f"Le produit de 5 et 8 est : {multiplier(5, 8)}") # On peut utiliser directement la valeur retournée
    ```
    Quand une instruction `return` est exécutée, la fonction se termine immédiatement, même s'il y a d'autres lignes de code après le `return` dans la fonction.

*   **Retourner Plusieurs Valeurs**
    En Python, une fonction peut retourner plusieurs valeurs. Celles-ci sont en fait retournées sous forme d'un tuple.

    ```python
    def obtenir_coordonnees():
        x = 10
        y = 20
        z = 5
        return x, y, z # Retourne le tuple (10, 20, 5)

    coords = obtenir_coordonnees()
    print(f"Coordonnées (tuple) : {coords}") # Affiche : Coordonnées (tuple) : (10, 20, 5)
    print(f"x = {coords[0]}, y = {coords[1]}, z = {coords[2]}")

    # On peut aussi "dépaqueter" le tuple directement dans des variables
    coord_x, coord_y, coord_z = obtenir_coordonnees()
    print(f"x direct = {coord_x}, y direct = {coord_y}, z direct = {coord_z}")
    ```

*   **Fonctions qui ne Retournent Rien Explicitement**
    Si une fonction n'a pas d'instruction `return`, ou si elle a un `return` sans valeur (juste `return`), elle retourne implicitement la valeur spéciale `None`. `None` est un type de données spécial en Python qui représente l'absence de valeur.

    ```python
    def afficher_message(message):
        print(message)
        # Pas de return explicite

    retour = afficher_message("Test de retour implicite")
    print(f"La fonction afficher_message a retourné : {retour}") # Affiche : La fonction afficher_message a retourné : None
    ```

## 4. Portée des Variables (Scope)

La portée (ou scope) d'une variable définit où dans votre code cette variable est accessible et peut être utilisée.

*   **Variables Locales**
    Une variable définie à l'intérieur d'une fonction est appelée une variable locale. Elle n'existe et n'est accessible qu'à l'intérieur de cette fonction.

    ```python
    def ma_fonction():
        variable_locale = "Je suis locale" # Définie à l'intérieur de la fonction
        print(variable_locale)

    ma_fonction() # Affiche : Je suis locale
    # print(variable_locale) # Erreur : NameError: name 'variable_locale' is not defined
                           # car elle n'existe pas en dehors de ma_fonction()
    ```
    Les paramètres d'une fonction sont également des variables locales à cette fonction.

*   **Variables Globales**
    Une variable définie à l'extérieur de toute fonction est appelée une variable globale. Elle est accessible depuis n'importe où dans votre module (fichier `.py`), y compris à l'intérieur des fonctions (en lecture).

    ```python
    variable_globale = "Je suis globale"

    def fonction_globale_lecture():
        print(f"À l'intérieur de la fonction : {variable_globale}") # Accès en lecture à la variable globale

    fonction_globale_lecture() # Affiche : À l'intérieur de la fonction : Je suis globale
    print(f"À l'extérieur de la fonction : {variable_globale}") # Affiche : À l'extérieur de la fonction : Je suis globale
    ```
    **Modifier une Variable Globale à l'Intérieur d'une Fonction :**
    Si vous voulez modifier la valeur d'une variable globale à l'intérieur d'une fonction, vous devez utiliser le mot-clé `global`. Cependant, l'utilisation excessive de variables globales et leur modification depuis des fonctions est généralement déconseillée car cela peut rendre le code plus difficile à suivre et à déboguer.

    ```python
    compteur_global = 0

    def incrementer_compteur():
        global compteur_global # Indique qu'on veut utiliser la variable globale 'compteur_global'
        compteur_global += 1
        print(f"Compteur (dans fonction) : {compteur_global}")

    def afficher_compteur_sans_global():
        # Si on faisait compteur_global += 1 ici sans 'global compteur_global',
        # Python créerait une nouvelle variable LOCALE nommée compteur_global,
        # et cela lèverait une UnboundLocalError si on essaie de lire avant d'écrire.
        # Pour juste lire, pas besoin de 'global'.
        print(f"Compteur (lecture seule) : {compteur_global}")


    incrementer_compteur() # Compteur (dans fonction) : 1
    incrementer_compteur() # Compteur (dans fonction) : 2
    print(f"Compteur (global après appels) : {compteur_global}") # Compteur (global après appels) : 2
    afficher_compteur_sans_global() # Compteur (lecture seule) : 2
    ```
    **Règle LEGB (Local, Enclosing function locals, Global, Built-in) :**
    Python recherche les variables dans cet ordre :
    1.  **L**ocal : portée de la fonction actuelle.
    2.  **E**nclosing function locals : portées des fonctions englobantes (pour les fonctions imbriquées).
    3.  **G**lobal : portée du module.
    4.  **B**uilt-in : noms pré-définis par Python (comme `print()`, `len()`, `str`, etc.).

## 5. Docstrings (Chaînes de Documentation)

Une docstring est une chaîne de caractères littérale qui apparaît comme la première instruction dans la définition d'un module, d'une fonction, d'une classe ou d'une méthode. Elle est utilisée pour documenter ce que fait l'objet.
Elle est encadrée par des triples guillemets (`"""..."""` ou `'''...'''`).

```python
def calculer_moyenne(liste_nombres):
    """
    Calcule et retourne la moyenne d'une liste de nombres.

    Args:
        liste_nombres (list): Une liste de nombres (int ou float).
                              La liste ne doit pas être vide.

    Returns:
        float: La moyenne des nombres dans la liste.
               Retourne None si la liste est vide ou non valide.
    """
    if not liste_nombres or not isinstance(liste_nombres, list):
        print("Erreur : l'argument doit être une liste non vide de nombres.")
        return None
    if not all(isinstance(num, (int, float)) for num in liste_nombres):
        print("Erreur : la liste ne doit contenir que des nombres.")
        return None

    somme = sum(liste_nombres)
    moyenne = somme / len(liste_nombres)
    return moyenne

# Accéder à la docstring
print(calculer_moyenne.__doc__)
# Ou utiliser la fonction help()
# help(calculer_moyenne)

resultat_moyenne = calculer_moyenne([10, 20, 30])
if resultat_moyenne is not None:
    print(f"La moyenne est : {resultat_moyenne}")

resultat_moyenne_vide = calculer_moyenne([]) # Test avec liste vide
```
Écrire de bonnes docstrings est une excellente pratique. Elles aident les autres (et vous-même dans le futur) à comprendre comment utiliser votre code. Des outils peuvent aussi générer automatiquement de la documentation à partir des docstrings.

Les fonctions sont des outils puissants pour structurer votre code. En les maîtrisant, vous écrirez des programmes plus modulaires, plus lisibles et plus faciles à maintenir. Elles sont essentielles pour aborder des projets plus complexes.
