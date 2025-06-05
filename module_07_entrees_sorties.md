# Module 7: Entrées et Sorties

Un programme a souvent besoin d'interagir avec l'extérieur : pour recevoir des données de l'utilisateur (entrées) ou pour stocker/afficher des résultats (sorties). Ce module couvre les bases de la gestion des entrées utilisateur et de la manipulation des fichiers en Python.

## 1. Lire des Entrées Utilisateur

La façon la plus simple d'obtenir une information de l'utilisateur en mode console est d'utiliser la fonction intégrée `input()`.

*   **La fonction `input()`**
    *   Elle affiche une invite (un message) à l'utilisateur, attend que l'utilisateur tape quelque chose et appuie sur Entrée.
    *   Elle retourne toujours ce que l'utilisateur a tapé sous forme d'une **chaîne de caractères (`str`)**.

    ```python
    nom = input("Quel est votre nom ? ") # L'invite est "Quel est votre nom ? "
    print(f"Bonjour, {nom} !")

    ville_preferee = input(f"{nom}, quelle est votre ville préférée ? ")
    print(f"Ah, {ville_preferee} ! C'est une belle ville.")
    ```

*   **Conversion de Type des Entrées**
    Puisque `input()` retourne toujours une chaîne, si vous attendez un nombre de l'utilisateur, vous devrez convertir cette chaîne dans le type numérique approprié (par exemple, `int` ou `float`).

    ```python
    age_str = input("Quel âge avez-vous ? ")

    # Si on essaie de faire des opérations numériques directement, ça ne marchera pas comme attendu
    # print(age_str + 5) # Erreur : TypeError, on ne peut pas additionner str et int

    # Conversion en entier (int)
    try:
        age_num = int(age_str)
        print(f"Dans 5 ans, vous aurez {age_num + 5} ans.")
    except ValueError:
        print("Erreur : Veuillez entrer un nombre valide pour l'âge.")

    # Conversion en nombre à virgule flottante (float)
    prix_str = input("Entrez le prix d'un article : ")
    try:
        prix_float = float(prix_str)
        prix_ttc = prix_float * 1.20 # Supposons une TVA de 20%
        print(f"Le prix TTC est de : {prix_ttc:.2f} €") # :.2f pour formater avec 2 décimales
    except ValueError:
        print("Erreur : Veuillez entrer un nombre valide pour le prix.")
    ```
    L'utilisation de `try-except` (que nous verrons plus en détail dans le Module 9 sur la gestion des erreurs) est une bonne pratique pour gérer les cas où l'utilisateur entre une valeur qui ne peut pas être convertie (par exemple, du texte au lieu d'un nombre).

## 2. Travailler avec des Fichiers

Lire et écrire dans des fichiers est une tâche courante en programmation. Python offre des outils simples pour interagir avec le système de fichiers.

*   **Ouverture de Fichiers : La fonction `open()`**
    *   Pour lire ou écrire dans un fichier, vous devez d'abord l'ouvrir en utilisant la fonction `open()`.
    *   Syntaxe de base : `fichier_objet = open("nom_du_fichier.txt", "mode")`
    *   Elle retourne un **objet fichier** (parfois appelé "handle" ou "flux") que vous utiliserez pour interagir avec le fichier.

*   **Modes d'Ouverture Courants**
    Le deuxième argument de `open()` est une chaîne spécifiant le mode d'ouverture :
    *   `'r'` : **Lecture (Read)**. Ouvre le fichier en mode lecture. C'est le mode par défaut si aucun n'est spécifié. Le fichier doit exister, sinon une erreur `FileNotFoundError` est levée.
    *   `'w'` : **Écriture (Write)**. Ouvre le fichier en mode écriture.
        *   Si le fichier existe, son contenu est **écrasé**.
        *   Si le fichier n'existe pas, il est **créé**.
    *   `'a'` : **Ajout (Append)**. Ouvre le fichier en mode ajout.
        *   Si le fichier existe, les nouvelles données sont ajoutées à la fin du fichier.
        *   Si le fichier n'existe pas, il est **créé**.
    *   `'r+'` : Lecture et Écriture. Le fichier doit exister.
    *   `'w+'` : Lecture et Écriture. Écrase le fichier existant ou le crée.
    *   `'a+'` : Lecture et Ajout. Crée le fichier s'il n'existe pas.
    *   Vous pouvez ajouter `'b'` au mode pour les fichiers binaires (par exemple, `'rb'` pour lire un fichier binaire, `'wb'` pour écrire un fichier binaire). Pour les fichiers texte (comme `.txt`, `.csv`, `.py`), on n'utilise généralement pas `'b'`.

*   **Fermeture de Fichiers : `close()`**
    *   Après avoir fini de travailler avec un fichier, il est **crucial** de le fermer en utilisant la méthode `close()` de l'objet fichier.
    *   `fichier_objet.close()`
    *   La fermeture libère les ressources système associées au fichier et s'assure que toutes les données écrites sont effectivement sauvegardées sur le disque (les données peuvent être mises en tampon).
    *   Si vous oubliez de fermer un fichier (surtout en mode écriture), vous risquez de perdre des données ou de rencontrer d'autres problèmes.

*   **Utilisation du Gestionnaire de Contexte `with open(...) as ...:` (Meilleure Pratique)**
    Pour s'assurer qu'un fichier est toujours fermé correctement, même si des erreurs se produisent pendant son traitement, il est fortement recommandé d'utiliser un gestionnaire de contexte avec l'instruction `with`.

    ```python
    # Syntaxe du gestionnaire de contexte
    try:
        with open("mon_fichier.txt", "w") as f:
            # f est l'objet fichier
            f.write("Bonjour, monde du fichier !\n")
            f.write("Ceci est une deuxième ligne.\n")
            # Pas besoin d'appeler f.close() explicitement.
            # Le fichier sera automatiquement fermé à la sortie de ce bloc 'with',
            # même si une erreur se produit à l'intérieur.
        print("Données écrites dans mon_fichier.txt")
    except IOError:
        print("Erreur : Impossible d'écrire dans le fichier.")

    # Lecture avec 'with'
    try:
        with open("mon_fichier.txt", "r") as f_lecture:
            contenu = f_lecture.read()
            print("\nContenu lu depuis mon_fichier.txt:")
            print(contenu)
    except FileNotFoundError:
        print("Erreur : Le fichier mon_fichier.txt n'a pas été trouvé.")
    except IOError:
        print("Erreur : Impossible de lire le fichier.")
    ```
    **Utilisez toujours `with open(...)` lorsque vous travaillez avec des fichiers.**

## 3. Lecture depuis des Fichiers

Une fois un fichier ouvert en mode lecture (ou un mode incluant la lecture), vous pouvez lire son contenu de plusieurs manières.

Supposons que nous avons un fichier `exemple.txt` avec le contenu suivant :
```
Ligne 1 du fichier.
Ligne 2 avec quelques mots.
Et une troisième ligne.
```

*   **`.read(taille)` : Lire tout ou une partie du contenu**
    *   Si `taille` n'est pas spécifiée ou est négative, lit tout le contenu du fichier et le retourne sous forme d'une seule chaîne de caractères.
    *   Si `taille` est spécifiée, lit et retourne au plus `taille` octets (ou caractères en mode texte).

    ```python
    try:
        with open("exemple.txt", "r") as f:
            contenu_total = f.read()
            print("--- .read() ---")
            print(contenu_total)

        with open("exemple.txt", "r") as f:
            premier_morceau = f.read(10) # Lit les 10 premiers caractères
            print("\n--- .read(10) ---")
            print(premier_morceau)
            deuxieme_morceau = f.read(15) # Lit les 15 caractères suivants
            print("\n--- .read(15) après le premier ---")
            print(deuxieme_morceau)
    except FileNotFoundError:
        print("Le fichier exemple.txt n'existe pas. Veuillez le créer.")
    ```

*   **`.readline()` : Lire une seule ligne**
    *   Lit une ligne depuis la position actuelle jusqu'au prochain caractère de nouvelle ligne `\n` (inclus).
    *   Retourne une chaîne vide `''` si la fin du fichier (EOF - End Of File) est atteinte.

    ```python
    try:
        with open("exemple.txt", "r") as f:
            print("\n--- .readline() ---")
            ligne1 = f.readline()
            print(f"Ligne 1: '{ligne1.strip()}'") # .strip() pour enlever le \n final
            ligne2 = f.readline()
            print(f"Ligne 2: '{ligne2.strip()}'")
            ligne_vide_fin = f.readline() # troisième ligne
            ligne_vide_fin = f.readline() # devrait être une chaîne vide si fin de fichier
            if not ligne_vide_fin:
                print("Fin du fichier atteinte avec readline.")
    except FileNotFoundError:
        print("Le fichier exemple.txt n'existe pas.")
    ```

*   **`.readlines()` : Lire toutes les lignes dans une liste**
    *   Lit toutes les lignes restantes du fichier et les retourne sous forme d'une **liste de chaînes**. Chaque chaîne dans la liste correspond à une ligne du fichier et inclut le caractère de nouvelle ligne `\n` à la fin (sauf potentiellement pour la dernière ligne).

    ```python
    try:
        with open("exemple.txt", "r") as f:
            print("\n--- .readlines() ---")
            toutes_les_lignes = f.readlines()
            print(toutes_les_lignes) # ['Ligne 1 du fichier.\n', 'Ligne 2 avec quelques mots.\n', 'Et une troisième ligne.']
            for i, ligne in enumerate(toutes_les_lignes):
                print(f"Ligne {i+1} (readlines): {ligne.strip()}")
    except FileNotFoundError:
        print("Le fichier exemple.txt n'existe pas.")
    ```

*   **Itérer sur les Lignes d'un Fichier (Méthode la plus "Pythonique" pour lire ligne par ligne)**
    L'objet fichier est itérable. Vous pouvez donc directement l'utiliser dans une boucle `for` pour lire le fichier ligne par ligne. C'est efficace en termes de mémoire car cela ne charge pas tout le fichier en mémoire d'un coup.

    ```python
    try:
        with open("exemple.txt", "r") as f:
            print("\n--- Itération directe sur l'objet fichier ---")
            for numero_ligne, ligne_texte in enumerate(f): # f est itérable
                print(f"Ligne {numero_ligne + 1} (itération): {ligne_texte.strip()}")
    except FileNotFoundError:
        print("Le fichier exemple.txt n'existe pas.")
    ```

## 4. Écriture dans des Fichiers

Pour écrire dans un fichier, vous devez l'ouvrir en mode écriture (`'w'`) ou ajout (`'a'`).

*   **`.write(chaine)` : Écrire une chaîne**
    *   Écrit la `chaine` spécifiée dans le fichier.
    *   Contrairement à `print()`, `write()` n'ajoute **pas** automatiquement de caractère de nouvelle ligne. Vous devez l'ajouter manuellement avec `\n` si vous en voulez un.
    *   Retourne le nombre de caractères écrits.

    ```python
    try:
        with open("sortie.txt", "w") as f_sortie: # Mode 'w' : écrase le fichier s'il existe
            f_sortie.write("Première ligne écrite en Python.\n")
            f_sortie.write("Ceci est la deuxième phrase. ")
            f_sortie.write("Et voici la fin de la deuxième ligne.\n")
            nombre_caracteres = f_sortie.write("Troisième ligne.\n")
            print(f"Nombre de caractères écrits pour la 3e ligne : {nombre_caracteres}")
        print("Données écrites dans sortie.txt (mode 'w').")

        # Vérifions le contenu en le lisant
        with open("sortie.txt", "r") as f_lecture:
            print("\nContenu de sortie.txt :")
            print(f_lecture.read())
    except IOError:
        print("Erreur lors de l'écriture ou de la lecture du fichier sortie.txt")

    # Écrire en mode ajout ('a')
    try:
        with open("sortie.txt", "a") as f_ajout: # Mode 'a' : ajoute à la fin
            f_ajout.write("Quatrième ligne, ajoutée plus tard.\n")
            f_ajout.write("Cinquième ligne en mode ajout.\n")
        print("\nDonnées ajoutées dans sortie.txt (mode 'a').")

        with open("sortie.txt", "r") as f_lecture:
            print("\nNouveau contenu de sortie.txt :")
            print(f_lecture.read())
    except IOError:
        print("Erreur lors de l'ajout ou de la lecture du fichier sortie.txt")
    ```

*   **`.writelines(liste_de_chaines)` : Écrire une liste de chaînes**
    *   Écrit chaque chaîne de la `liste_de_chaines` dans le fichier.
    *   Comme `write()`, `writelines()` n'ajoute **pas** de caractères de nouvelle ligne entre les chaînes. Vous devez vous assurer que les chaînes de votre liste contiennent déjà les `\n` si nécessaire.

    ```python
    lignes_a_ecrire = [
        "Liste de courses :\n",
        "- Pommes\n",
        "- Lait\n",
        "- Pain\n"
    ]
    try:
        with open("liste_courses.txt", "w") as f_courses:
            f_courses.writelines(lignes_a_ecrire)
        print("Fichier liste_courses.txt créé.")

        with open("liste_courses.txt", "r") as f_lecture_courses:
            print("\nContenu de liste_courses.txt :")
            print(f_lecture_courses.read())
    except IOError:
        print("Erreur lors de la création ou lecture de liste_courses.txt")
    ```

**Exemple Pratique : Copier un Fichier**
```python
def copier_fichier(source, destination):
    """Copie le contenu d'un fichier source vers un fichier destination."""
    try:
        with open(source, "r") as f_source:
            with open(destination, "w") as f_dest:
                contenu_a_copier = f_source.read()
                f_dest.write(contenu_a_copier)
        print(f"Fichier '{source}' copié avec succès vers '{destination}'.")
    except FileNotFoundError:
        print(f"Erreur : Le fichier source '{source}' n'a pas été trouvé.")
    except IOError as e: # 'e' contient des infos sur l'erreur
        print(f"Erreur d'entrée/sortie : {e}")

# Créons un fichier source pour le test
with open("source_pour_copie.txt", "w") as f:
    f.write("Ceci est le fichier source.\nIl contient plusieurs lignes.\nFin du fichier source.")

copier_fichier("source_pour_copie.txt", "destination_copie.txt")

# Vérifions la copie
try:
    with open("destination_copie.txt", "r") as f:
        print("\nContenu du fichier copié :")
        print(f.read())
except FileNotFoundError:
    print("Le fichier de destination n'a pas été créé.")
```

La gestion des entrées/sorties, en particulier la manipulation de fichiers, est une compétence essentielle. Elle ouvre la voie à la persistance des données (sauvegarder l'état d'un programme), à la lecture de configurations, à la génération de rapports, et bien plus encore. N'oubliez jamais l'importance de `with open(...)` pour une gestion propre des fichiers !
