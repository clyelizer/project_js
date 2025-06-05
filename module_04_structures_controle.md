# Module 4: Structures de Contrôle

Jusqu'à présent, nos scripts Python s'exécutaient de manière linéaire, une instruction après l'autre. Les **structures de contrôle** vont nous permettre de changer cela ! Elles servent à contrôler le flux d'exécution du programme, c'est-à-dire l'ordre dans lequel les instructions sont exécutées. Elles permettent à nos programmes de prendre des décisions (conditions) et de répéter des actions (boucles).

## 1. Conditions `if`/`elif`/`else`

Les instructions conditionnelles permettent d'exécuter des blocs de code uniquement si certaines conditions sont remplies.

*   **L'instruction `if` (Si)**
    Elle exécute un bloc de code si une condition est `True`.
    La syntaxe est :
    ```python
    if condition:
        # bloc de code à exécuter si la condition est True
        # Ce bloc est indenté (généralement 4 espaces)
    # Le code ici (non indenté) s'exécute après le if, que la condition soit True ou False
    ```
    La `condition` est une expression qui est évaluée à `True` ou `False` (souvent le résultat d'un opérateur de comparaison ou logique).

    ```python
    age = 20
    if age >= 18:
        print("Vous êtes majeur.") # Cette ligne s'exécute

    temperature = 15
    if temperature < 0:
        print("Il gèle !") # Cette ligne ne s'exécute pas
    print("Fin du programme météo.")
    ```

*   **L'instruction `else` (Sinon)**
    Elle permet d'exécuter un autre bloc de code si la condition du `if` est `False`.
    ```python
    if condition:
        # bloc de code si True
    else:
        # bloc de code si False (la condition du if était False)
    ```

    ```python
    age = 16
    if age >= 18:
        print("Vous êtes majeur.")
    else:
        print("Vous êtes mineur.") # Cette ligne s'exécute

    # Autre exemple
    mot_de_passe_correct = "Python123"
    mot_de_passe_utilisateur = input("Entrez votre mot de passe : ")

    if mot_de_passe_utilisateur == mot_de_passe_correct:
        print("Accès autorisé !")
    else:
        print("Mot de passe incorrect.")
    ```

*   **L'instruction `elif` (Sinon Si)**
    Elle permet de tester plusieurs conditions à la suite. `elif` est une contraction de "else if". Vous pouvez avoir autant de `elif` que nécessaire.
    ```python
    if condition1:
        # bloc de code si condition1 est True
    elif condition2:
        # bloc de code si condition1 est False ET condition2 est True
    elif condition3:
        # bloc de code si condition1 et condition2 sont False ET condition3 est True
    else:
        # bloc de code si toutes les conditions précédentes sont False
    ```

    ```python
    note = 75

    if note >= 90:
        grade = "A"
    elif note >= 80: # Testé seulement si note < 90
        grade = "B"
    elif note >= 70: # Testé seulement si note < 80
        grade = "C" # Cette condition est True (75 >= 70)
    elif note >= 60:
        grade = "D"
    else:
        grade = "F"
    print(f"Votre grade est : {grade}") # Affiche : Votre grade est : C

    # Exemple avec des conditions plus complexes
    heure = 14
    est_week_end = False

    if heure < 9 and not est_week_end:
        print("C'est le matin en semaine, au travail !")
    elif heure >= 12 and heure < 13 and not est_week_end:
        print("Pause déjeuner !")
    elif est_week_end:
        print("Bon week-end !")
    else:
        print("Journée de travail normale ou soirée.")
    ```
    Python évalue les conditions `if` et `elif` dans l'ordre. Dès qu'une condition est `True`, le bloc de code associé est exécuté, et les autres `elif` ou `else` sont ignorés.

*   **Opérateur Ternaire (Forme condensée de if/else)**
    Pour des affectations conditionnelles simples, on peut utiliser une syntaxe plus concise :
    `valeur_si_vrai if condition else valeur_si_faux`

    ```python
    age = 22
    statut = "majeur" if age >= 18 else "mineur"
    print(f"Statut : {statut}") # Affiche : Statut : majeur

    # Équivalent à :
    # if age >= 18:
    #     statut = "majeur"
    # else:
    #     statut = "mineur"
    ```

## 2. Boucles `for`

Une boucle `for` est utilisée pour itérer (parcourir) les éléments d'une séquence (comme une liste, un tuple, une chaîne de caractères) ou d'autres objets itérables. À chaque itération, une variable prend la valeur de l'élément suivant de la séquence.

La syntaxe est :
```python
for variable_iteration in sequence:
    # bloc de code à exécuter pour chaque élément de la sequence
    # 'variable_iteration' prend la valeur de l'élément courant
```

```python
# Itérer sur une liste
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(f"J'aime les {fruit}s")
# Sortie :
# J'aime les pommes
# J'aime les bananes
# J'aime les cerises

# Itérer sur une chaîne de caractères
message = "Python"
for lettre in message:
    print(lettre)
# Sortie :
# P
# y
# t
# h
# o
# n

# Utilisation de range()
# La fonction range() génère une séquence de nombres.
# range(fin) : de 0 à fin-1
# range(debut, fin) : de debut à fin-1
# range(debut, fin, pas) : de debut à fin-1, avec un incrément de 'pas'

print("Nombres de 0 à 4 :")
for i in range(5): # Équivalent à range(0, 5)
    print(i)
# Sortie : 0, 1, 2, 3, 4

print("Nombres de 2 à 5 :")
for i in range(2, 6):
    print(i)
# Sortie : 2, 3, 4, 5

print("Nombres pairs de 0 à 8 :")
for i in range(0, 10, 2): # Le pas est de 2
    print(i)
# Sortie : 0, 2, 4, 6, 8

# Utiliser range() pour accéder aux éléments d'une liste par index (moins "pythonique" que l'itération directe)
nombres = [10, 20, 30, 40]
for i in range(len(nombres)): # len(nombres) vaut 4, donc range(4) -> 0, 1, 2, 3
    print(f"À l'index {i}, la valeur est {nombres[i]}")

# Itérer sur les clés d'un dictionnaire (par défaut)
personne = {"nom": "Alice", "age": 30, "ville": "Paris"}
print("Clés du dictionnaire personne :")
for cle in personne: # ou personne.keys()
    print(f"{cle} -> {personne[cle]}")

# Itérer sur les valeurs d'un dictionnaire
print("Valeurs du dictionnaire personne :")
for valeur in personne.values():
    print(valeur)

# Itérer sur les paires clé-valeur d'un dictionnaire
print("Paires clé-valeur du dictionnaire personne :")
for cle, valeur in personne.items(): # .items() retourne des tuples (clé, valeur)
    print(f"{cle}: {valeur}")
```

## 3. Boucles `while`

Une boucle `while` (tant que) répète un bloc de code tant qu'une condition spécifiée est `True`.

La syntaxe est :
```python
while condition:
    # bloc de code à exécuter tant que la condition est True
    # Important : le bloc de code doit potentiellement modifier la condition
    # pour éviter une boucle infinie.
```

```python
# Exemple simple : compter jusqu'à 5
compteur = 0
while compteur < 5:
    print(f"Le compteur est à {compteur}")
    compteur = compteur + 1 # Ou compteur += 1. Crucial pour arrêter la boucle !
# Sortie :
# Le compteur est à 0
# Le compteur est à 1
# Le compteur est à 2
# Le compteur est à 3
# Le compteur est à 4
print("Fin de la boucle while.")

# Exemple : deviner un nombre
import random # Module pour générer des nombres aléatoires
nombre_secret = random.randint(1, 10) # Nombre aléatoire entre 1 et 10
essai = 0
tentatives = 0

print("Devinez le nombre secret entre 1 et 10.")
while essai != nombre_secret:
    essai_str = input("Votre essai : ")
    # Il faut gérer le cas où l'utilisateur ne rentre pas un nombre
    if essai_str.isdigit():
        essai = int(essai_str)
        tentatives += 1
        if essai < nombre_secret:
            print("Trop petit !")
        elif essai > nombre_secret:
            print("Trop grand !")
    else:
        print("Veuillez entrer un nombre valide.")

print(f"Bravo ! Vous avez trouvé le nombre {nombre_secret} en {tentatives} tentatives.")

# Boucle infinie (à éviter, ou à contrôler avec `break`)
# while True:
#     print("Ceci est une boucle infinie ! Appuyez sur Ctrl+C pour arrêter.")
#     # Il faudrait une condition de sortie (break) quelque part
```

## 4. Instructions de Contrôle de Boucle

Ces instructions permettent de modifier le comportement normal d'une boucle (`for` ou `while`).

*   **`break` (Casser / Interrompre)**
    L'instruction `break` termine immédiatement la boucle la plus interne (celle dans laquelle elle se trouve), et le programme continue à l'instruction suivante après la boucle.

    ```python
    print("Utilisation de break :")
    for i in range(10): # Théoriquement de 0 à 9
        if i == 5:
            print("On a atteint 5, on arrête la boucle.")
            break # Sort de la boucle for
        print(i)
    # Sortie : 0, 1, 2, 3, 4, "On a atteint 5, on arrête la boucle."

    # Utilisation de break dans un while (exemple de recherche)
    nombres = [2, 7, 1, 8, 5, 3, 9]
    valeur_a_trouver = 5
    index_trouve = -1
    i = 0
    while i < len(nombres):
        if nombres[i] == valeur_a_trouver:
            index_trouve = i
            print(f"Valeur {valeur_a_trouver} trouvée à l'index {index_trouve}.")
            break # Sort de la boucle while dès que la valeur est trouvée
        i += 1

    if index_trouve == -1:
        print(f"Valeur {valeur_a_trouver} non trouvée.")
    ```

*   **`continue` (Continuer / Passer à la suite)**
    L'instruction `continue` saute le reste du code à l'intérieur de la boucle pour l'itération actuelle et passe directement à l'itération suivante.

    ```python
    print("Utilisation de continue (afficher les nombres impairs) :")
    for i in range(10): # De 0 à 9
        if i % 2 == 0: # Si i est pair
            continue   # Ne pas exécuter le print() ci-dessous, passer à i suivant
        print(i)
    # Sortie : 1, 3, 5, 7, 9

    # Exemple avec une liste et continue
    notes = [12, 15, -1, 18, 9, -2, 10] # -1 et -2 sont des notes invalides
    notes_valides = []
    somme_valides = 0
    for note in notes:
        if note < 0 or note > 20:
            print(f"Note invalide ignorée : {note}")
            continue # Ignore cette note et passe à la suivante
        notes_valides.append(note)
        somme_valides += note

    if len(notes_valides) > 0:
        moyenne = somme_valides / len(notes_valides)
        print(f"Notes valides : {notes_valides}")
        print(f"Moyenne des notes valides : {moyenne}")
    else:
        print("Aucune note valide.")
    ```

*   **`pass` (Passer / Ne rien faire)**
    L'instruction `pass` est une opération nulle. Elle ne fait rien. Elle est utilisée comme un "placeholder" (espace réservé) là où la syntaxe Python requiert une instruction, mais où vous n'avez pas encore de code à écrire ou ne voulez rien faire.

    ```python
    if True:
        pass # TODO: Implémenter cette partie plus tard
    print("Après le pass.")

    def ma_fonction_pas_encore_implementee():
        pass # On définit la fonction mais on l'implémentera plus tard

    for i in range(5):
        if i == 3:
            # Peut-être une logique compliquée à ajouter ici
            pass # Pour l'instant, on ne fait rien de spécial pour i == 3
        print(i)
    ```
    `pass` est souvent utilisé lors de la conception de la structure d'un programme, pour définir des fonctions ou des classes qui seront complétées ultérieurement, sans causer d'erreur de syntaxe.

*   **Boucle `for`/`while` avec `else`** (Moins courant, mais existe)
    En Python, les boucles `for` et `while` peuvent avoir une clause `else`. Le bloc `else` s'exécute lorsque la boucle se termine **normalement** (c'est-à-dire sans avoir été interrompue par un `break`).

    ```python
    print("Boucle for avec else :")
    for i in range(5): # De 0 à 4
        print(i)
        # if i == 6: # Condition qui ne sera jamais vraie, donc pas de break
        #     break
    else:
        print("La boucle for s'est terminée normalement (sans break).")
    # Sortie : 0, 1, 2, 3, 4, "La boucle for s'est terminée normalement (sans break)."

    print("Boucle for avec else et break :")
    for i in range(5):
        print(i)
        if i == 2:
            print("Break à i=2")
            break
    else: # Ce bloc ne s'exécutera pas car la boucle a été "breakée"
        print("La boucle for s'est terminée normalement.")
    # Sortie : 0, 1, 2, "Break à i=2"

    # Idem avec while
    compteur = 0
    while compteur < 3:
        print(f"Compteur (while) : {compteur}")
        compteur += 1
        # if compteur == 5:
        #     break
    else:
        print("La boucle while s'est terminée normalement.")
    ```
    Ceci est utile, par exemple, pour exécuter du code si une recherche dans une boucle n'a pas abouti (donc, pas de `break`).

Les structures de contrôle sont fondamentales en programmation. Elles vous donnent le pouvoir de créer des logiques complexes, de réagir à différentes situations et d'automatiser des tâches répétitives. Maîtriser `if/elif/else`, `for` et `while` est une étape clé pour devenir un programmeur Python compétent.
