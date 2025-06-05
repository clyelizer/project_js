# Module 9: Gestion des Erreurs et Exceptions

Lors de l'écriture et de l'exécution de programmes, des erreurs peuvent survenir. Python distingue principalement deux types d'erreurs : les erreurs de syntaxe et les exceptions. Savoir comment gérer ces situations est crucial pour écrire des programmes robustes et fiables.

## 1. Erreurs de Syntaxe (Syntax Errors)

*   Les erreurs de syntaxe, également appelées erreurs d'analyse (parsing errors), se produisent lorsque le code que vous avez écrit ne respecte pas les règles grammaticales de Python.
*   L'interpréteur Python détecte ces erreurs **avant** que l'exécution du programme ne commence réellement.
*   Si une erreur de syntaxe est présente, votre programme ne s'exécutera pas du tout.
*   L'interpréteur affiche généralement un message d'erreur indiquant l'endroit où l'erreur a été détectée (souvent avec un `^` pointant vers l'endroit approximatif).

Exemples d'erreurs de syntaxe :
```python
# print("Bonjour" # Erreur : parenthèse fermante manquante
# SyntaxError: unexpected EOF while parsing (EOF = End Of File)

# if x = 5: # Erreur : '=' est pour l'affectation, '==' pour la comparaison
#     print("x vaut 5")
# SyntaxError: invalid syntax (peut-être '==' au lieu de '=' ?)

# def ma_fonction() # Erreur : double-point ':' manquant à la fin de la ligne def
#     print("Test")
# SyntaxError: invalid syntax
```
Pour corriger les erreurs de syntaxe, vous devez attentivement lire le message d'erreur et examiner la ligne de code incriminée (et parfois les lignes précédentes) pour trouver et corriger la faute de frappe ou l'erreur logique de structure.

## 2. Exceptions (Errors à l'Exécution)

*   Les exceptions sont des erreurs qui se produisent **pendant l'exécution** d'un programme, même si la syntaxe du code est correcte.
*   Lorsqu'une exception se produit et n'est pas gérée, le programme s'arrête brusquement et affiche un message d'erreur appelé "traceback" (ou trace de la pile d'exécution). Le traceback indique le type de l'exception, un message descriptif, et la séquence d'appels de fonctions qui a conduit à l'erreur.

*   **Exemples d'Exceptions Courantes :**
    *   **`TypeError`**: Opération appliquée à un objet d'un type inapproprié.
        ```python
        # resultat = "Bonjour" + 5 # TypeError: can only concatenate str (not "int") to str
        ```
    *   **`ValueError`**: Une fonction reçoit un argument d'un type correct mais avec une valeur inappropriée.
        ```python
        # nombre = int("abc") # ValueError: invalid literal for int() with base 10: 'abc'
        ```
    *   **`IndexError`**: Tentative d'accès à un index qui n'existe pas dans une séquence (liste, tuple, chaîne).
        ```python
        # ma_liste = [1, 2, 3]
        # print(ma_liste[5]) # IndexError: list index out of range
        ```
    *   **`KeyError`**: Tentative d'accès à une clé qui n'existe pas dans un dictionnaire.
        ```python
        # mon_dict = {"nom": "Alice"}
        # print(mon_dict["age"]) # KeyError: 'age'
        ```
    *   **`FileNotFoundError`**: Tentative d'ouverture d'un fichier qui n'existe pas en mode lecture.
        ```python
        # with open("fichier_inexistant.txt", "r") as f:
        #     contenu = f.read()
        # FileNotFoundError: [Errno 2] No such file or directory: 'fichier_inexistant.txt'
        ```
    *   **`ZeroDivisionError`**: Tentative de division par zéro.
        ```python
        # resultat = 10 / 0 # ZeroDivisionError: division by zero
        ```
    *   **`AttributeError`**: Tentative d'accès à un attribut ou une méthode qui n'existe pas pour un objet.
        ```python
        # x = 5
        # x.append(3) # AttributeError: 'int' object has no attribute 'append'
        ```
    *   **`NameError`**: Utilisation d'une variable ou d'un nom de fonction qui n'a pas été défini.
        ```python
        # print(variable_inconnue) # NameError: name 'variable_inconnue' is not defined
        ```

## 3. Gestion des Exceptions : Le Bloc `try`/`except`

Pour éviter que votre programme ne plante lorsqu'une exception se produit, vous pouvez la "gérer" (ou "attraper") en utilisant un bloc `try`/`except`.

*   **Syntaxe de Base :**
    ```python
    try:
        # Bloc de code où une exception pourrait se produire (le "code à essayer")
        # ...
    except TypeDeLException:
        # Bloc de code à exécuter SI TypeDeLException (ou une de ses sous-classes) se produit
        # ...
    # Le programme continue ici après le try/except
    ```

    ```python
    try:
        nombre_str = input("Entrez un nombre : ")
        nombre_int = int(nombre_str) # Peut lever un ValueError
        resultat = 10 / nombre_int     # Peut lever un ZeroDivisionError
        print(f"10 divisé par {nombre_int} = {resultat}")
    except ValueError:
        print("Erreur : Vous devez entrer un nombre entier valide.")
    except ZeroDivisionError:
        print("Erreur : Vous ne pouvez pas diviser par zéro.")
    # except:
    #     print("Une erreur inconnue s'est produite.") # Trop générique, à éviter si possible

    print("Suite du programme...")
    ```
    Dans cet exemple :
    1.  Python essaie d'exécuter le code dans le bloc `try`.
    2.  Si l'utilisateur entre "abc", `int("abc")` lève un `ValueError`. Le reste du bloc `try` est sauté, et le bloc `except ValueError:` est exécuté.
    3.  Si l'utilisateur entre "0", `int("0")` réussit, mais `10 / 0` lève un `ZeroDivisionError`. Le reste du bloc `try` est sauté, et le bloc `except ZeroDivisionError:` est exécuté.
    4.  Si l'utilisateur entre "5", aucune exception n'est levée dans le bloc `try`. Les blocs `except` sont ignorés.
    5.  Dans tous les cas (sauf si une exception non gérée se produit ou si le programme est quitté), le code après le bloc `try/except` (ici, `print("Suite du programme...")`) est exécuté.

*   **Attraper des Exceptions Spécifiques vs Génériques**
    *   Il est préférable d'attraper des exceptions spécifiques (comme `ValueError`, `FileNotFoundError`) plutôt qu'une exception générique `Exception` ou un `except:` vide.
    *   Cela vous permet de réagir différemment à différents types d'erreurs et d'éviter de masquer des erreurs inattendues que vous n'aviez pas prévues.
    *   Un `except:` vide attrapera **toutes** les exceptions, y compris `SystemExit` ou `KeyboardInterrupt` (Ctrl+C), ce qui peut rendre difficile l'arrêt du programme. Utilisez `except Exception:` si vous voulez attraper la plupart des erreurs d'exécution standard.

*   **Attraper Plusieurs Exceptions avec un Seul Bloc `except`**
    Vous pouvez spécifier plusieurs types d'exceptions dans un tuple :
    ```python
    try:
        # ... code susceptible de lever ValueError ou TypeError ...
        x = int(input("Entrez x: "))
        y = int(input("Entrez y: "))
        print(x / y)
    except (ValueError, TypeError):
        print("Erreur : Entrée invalide (doit être un nombre) ou type incorrect.")
    except ZeroDivisionError:
        print("Erreur : Division par zéro.")
    ```

*   **Accéder à l'Objet Exception**
    Vous pouvez obtenir une référence à l'objet exception lui-même en utilisant `as nom_variable` dans la clause `except`. Cet objet contient souvent des informations utiles sur l'erreur.
    ```python
    try:
        valeur = int("texte")
    except ValueError as ve: # 've' est l'instance de ValueError
        print(f"Une erreur de valeur s'est produite : {ve}")
        print(f"Type de l'erreur : {type(ve)}")
        print(f"Arguments de l'erreur : {ve.args}")
    # Sortie :
    # Une erreur de valeur s'est produite : invalid literal for int() with base 10: 'texte'
    # Type de l'erreur : <class 'ValueError'>
    # Arguments de l'erreur : ("invalid literal for int() with base 10: 'texte'",)
    ```

## 4. Le Bloc `else` (dans `try`/`except`)

La clause `else` est optionnelle et, si présente, son bloc de code est exécuté **uniquement si aucune exception n'est levée** dans le bloc `try`.
C'est utile pour mettre du code qui doit s'exécuter seulement si le bloc `try` a réussi, séparant ainsi le code "à risque" du code "de succès".

```python
try:
    fichier_nom = "mon_fichier_test.txt"
    with open(fichier_nom, "r") as f:
        contenu = f.read()
except FileNotFoundError:
    print(f"Le fichier '{fichier_nom}' n'a pas été trouvé.")
except IOError:
    print(f"Erreur d'E/S lors de la lecture du fichier '{fichier_nom}'.")
else:
    # Ce bloc s'exécute seulement si le 'try' a réussi (fichier trouvé et lu)
    print(f"Contenu du fichier '{fichier_nom}':")
    print(contenu)
    print("Le fichier a été lu avec succès.")
    # f.close() n'est pas nécessaire ici grâce à 'with open'
```

## 5. Le Bloc `finally`

La clause `finally` est optionnelle et, si présente, son bloc de code est **toujours exécuté**, que le bloc `try` ait levé une exception ou non, et même si une instruction `return`, `break` ou `continue` est rencontrée dans le `try` ou `except`.
Le bloc `finally` est typiquement utilisé pour des opérations de "nettoyage" qui doivent impérativement être effectuées, comme fermer des fichiers, libérer des ressources externes (connexions réseau, bases de données), etc.

```python
fichier = None # Initialiser à None pour pouvoir vérifier dans finally
try:
    print("Début du bloc try.")
    fichier = open("test_finally.txt", "w")
    # Simuler une erreur potentielle
    # resultat = 10 / 0
    fichier.write("Bonjour depuis le bloc try-finally !")
    print("Écriture dans le fichier réussie.")
    # return # Même avec un return, finally s'exécute
except ZeroDivisionError:
    print("Erreur de division par zéro attrapée !")
except Exception as e:
    print(f"Une autre exception s'est produite : {e}")
else:
    print("Le bloc try s'est terminé sans exception (else).")
finally:
    print("Bloc finally : Exécution du nettoyage.")
    if fichier: # Vérifier si le fichier a bien été ouvert
        print("Fermeture du fichier.")
        fichier.close()
    else:
        print("Le fichier n'a pas été ouvert ou n'a pas pu l'être.")

print("Après le bloc try/except/else/finally.")
```
Note : Si vous utilisez la construction `with open(...) as ...:`, la fermeture du fichier est gérée automatiquement, ce qui rend un bloc `finally` spécifiquement pour `f.close()` moins nécessaire dans ce cas précis. Cependant, `finally` reste très utile pour d'autres types de ressources.

Ordre d'exécution avec toutes les clauses :
1.  Bloc `try`.
2.  Si exception : bloc `except` correspondant.
3.  Si pas d'exception : bloc `else` (s'il existe).
4.  Toujours : bloc `finally` (s'il existe).

## 6. Lever des Exceptions (`raise`)

Vous pouvez aussi déclencher (ou "lever") des exceptions vous-même en utilisant le mot-clé `raise`. Cela peut être utile pour indiquer une condition d'erreur dans votre propre code, par exemple si une fonction reçoit des arguments invalides selon la logique de votre application.

```python
def calculer_age_chien_humain(age_chien):
    if age_chien < 0:
        raise ValueError("L'âge du chien ne peut pas être négatif.")
    if not isinstance(age_chien, (int, float)):
        raise TypeError("L'âge du chien doit être un nombre.")
    # Logique simplifiée
    return age_chien * 7

try:
    age_humain = calculer_age_chien_humain(5)
    print(f"Âge humain équivalent : {age_humain}")

    # age_humain = calculer_age_chien_humain(-2) # Va lever ValueError
    # print(f"Âge humain équivalent : {age_humain}")

    age_humain = calculer_age_chien_humain("trois") # Va lever TypeError
    print(f"Âge humain équivalent : {age_humain}")

except ValueError as ve:
    print(f"Erreur de valeur : {ve}")
except TypeError as te:
    print(f"Erreur de type : {te}")
```

*   **Lever une exception existante :** `raise NomDeLException("Message d'erreur optionnel")`
*   **Relaver une exception (re-raise) :** Dans un bloc `except`, vous pouvez utiliser `raise` sans argument pour relaver l'exception qui vient d'être attrapée. C'est utile si vous voulez, par exemple, logger l'erreur puis la laisser se propager.
    ```python
    try:
        # ... code ...
        x = 1 / 0
    except ZeroDivisionError as zde:
        print(f"LOG: Une division par zéro s'est produite : {zde}")
        # Peut-être faire autre chose ici (nettoyage partiel)
        raise # Relève la ZeroDivisionError originale pour qu'elle soit gérée plus haut
    ```

*   **Créer des Exceptions Personnalisées (Introduction)**
    Pour des applications plus complexes, vous pouvez définir vos propres types d'exceptions en héritant de la classe `Exception` (ou d'une de ses sous-classes).
    ```python
    class MonErreurApplication(Exception):
        """Exception de base pour mon application."""
        pass

    class ErreurDeValidation(MonErreurApplication):
        """Levée lorsqu'une validation de données échoue."""
        def __init__(self, champ, message="La validation a échoué"):
            self.champ = champ
            self.message = f"{message} pour le champ '{champ}'"
            super().__init__(self.message)

    try:
        donnee_utilisateur = "" # Supposons une entrée vide
        if not donnee_utilisateur:
            raise ErreurDeValidation("nom_utilisateur", "Le champ ne peut pas être vide")
    except ErreurDeValidation as eve:
        print(f"Erreur de validation personnalisée : {eve}")
        print(f"Champ concerné : {eve.champ}")
    ```

La gestion des exceptions est une partie intégrante de l'écriture de code Python robuste. Elle permet à vos programmes de réagir gracieusement aux erreurs imprévues, d'informer l'utilisateur de manière appropriée et de continuer à fonctionner lorsque c'est possible, ou de s'arrêter proprement.
