# Module 3: Opérateurs

Après avoir exploré les variables et les types de données, nous allons maintenant nous pencher sur les **opérateurs**. Les opérateurs sont des symboles spéciaux en Python (et dans la plupart des langages de programmation) qui effectuent des opérations sur des valeurs et des variables (appelées opérandes). Ils sont les briques de base pour effectuer des calculs, prendre des décisions et manipuler des données.

## 1. Opérateurs Arithmétiques

Ces opérateurs sont utilisés pour effectuer des opérations mathématiques courantes.

| Opérateur | Description          | Exemple (avec `a = 10`, `b = 3`) | Résultat |
| :-------- | :------------------- | :------------------------------- | :------- |
| `+`       | Addition             | `a + b`                          | `13`     |
| `-`       | Soustraction         | `a - b`                          | `7`      |
| `*`       | Multiplication       | `a * b`                          | `30`     |
| `/`       | Division             | `a / b`                          | `3.333...` (toujours un float) |
| `//`      | Division entière     | `a // b`                         | `3`      (partie entière du quotient) |
| `%`       | Modulo               | `a % b`                          | `1`      (reste de la division entière) |
| `**`      | Exponentiation       | `a ** b`                         | `1000`   (a puissance b) |

```python
a = 10
b = 3

print(f"a + b  = {a + b}")
print(f"a - b  = {a - b}")
print(f"a * b  = {a * b}")
print(f"a / b  = {a / b}")
print(f"a // b = {a // b}")
print(f"a % b  = {a % b}")
print(f"a ** b = {a ** b}")

# Ordre de priorité des opérations (PEMDAS/BODMAS) est respecté :
# Parenthèses, Exposants, Multiplication/Division, Addition/Soustraction.
resultat_complexe = (a + b) * 2 - (a // b) ** 2
# (10 + 3) * 2 - (10 // 3) ** 2
# 13 * 2 - 3 ** 2
# 26 - 9
# 17
print(f"Résultat complexe : {resultat_complexe}") # Affiche : Résultat complexe : 17
```

Les opérateurs arithmétiques peuvent aussi être utilisés avec des variables de type `float`. Si un `int` et un `float` sont utilisés dans une opération, le résultat est généralement un `float`.

```python
x = 5.0
y = 2
print(f"x / y = {x / y}") # Affiche : 2.5
```

## 2. Opérateurs de Comparaison

Ces opérateurs sont utilisés pour comparer deux valeurs. Ils retournent toujours une valeur booléenne (`True` ou `False`).

| Opérateur | Description              | Exemple (avec `x = 10`, `y = 5`) | Résultat |
| :-------- | :----------------------- | :------------------------------- | :------- |
| `==`      | Égal à                   | `x == y`                         | `False`  |
| `!=`      | Différent de             | `x != y`                         | `True`   |
| `>`       | Supérieur à              | `x > y`                          | `True`   |
| `<`       | Inférieur à              | `x < y`                          | `False`  |
| `>=`      | Supérieur ou égal à      | `x >= y`                         | `True`   |
| `<=`      | Inférieur ou égal à      | `x <= y`                         | `False`  |

```python
x = 10
y = 5
z = 10

print(f"x == y : {x == y}")   # False
print(f"x == z : {x == z}")   # True
print(f"x != y : {x != y}")   # True
print(f"x > y  : {x > y}")    # True
print(f"x < y  : {x < y}")    # False
print(f"x >= y : {x >= y}")   # True
print(f"x >= z : {x >= z}")   # True
print(f"x <= y : {x <= y}")   # False
print(f"x <= z : {x <= z}")   # True

# Peuvent aussi être utilisés avec des chaînes (comparaison lexicographique)
print(f"'apple' < 'banana' : {'apple' < 'banana'}") # True
print(f"'Zebra' == 'zebra' : {'Zebra' == 'zebra'}") # False (sensible à la casse)
```
Ces opérateurs sont cruciaux pour les structures de contrôle conditionnelles (comme les `if`) que nous verrons dans le prochain module.

## 3. Opérateurs Logiques

Ces opérateurs sont utilisés pour combiner des expressions booléennes.

| Opérateur | Description                                     | Exemple (avec `p = True`, `q = False`) | Résultat |
| :-------- | :---------------------------------------------- | :------------------------------------- | :------- |
| `and`     | ET logique : Vrai si les deux opérandes sont Vrai | `p and q`                              | `False`  |
| `or`      | OU logique : Vrai si au moins un opérande est Vrai | `p or q`                               | `True`   |
| `not`     | NON logique : Inverse la valeur booléenne        | `not p`                                | `False`  |

```python
p = True
q = False
r = True

# Opérateur and
print(f"p and q : {p and q}") # False (True and False)
print(f"p and r : {p and r}") # True  (True and True)

# Opérateur or
print(f"p or q  : {p or q}")  # True  (True or False)
print(f"q or False : {q or False}") # False (False or False)

# Opérateur not
print(f"not p   : {not p}")   # False (not True)
print(f"not q   : {not q}")   # True  (not False)

# Combinaison avec des opérateurs de comparaison
age = 25
est_etudiant = False

# Condition 1: Avoir plus de 18 ans ET être étudiant
condition1 = (age > 18) and est_etudiant
print(f"Plus de 18 ans ET étudiant : {condition1}") # False

# Condition 2: Avoir plus de 65 ans OU être étudiant
condition2 = (age > 65) or est_etudiant
print(f"Plus de 65 ans OU étudiant : {condition2}") # False

# Condition 3: Ne pas être étudiant
condition3 = not est_etudiant
print(f"N'est pas étudiant : {condition3}") # True
```

**Évaluation en Court-Circuit (Short-Circuit Evaluation) :**
Les opérateurs `and` et `or` en Python utilisent l'évaluation en court-circuit.
*   Pour `a and b` : si `a` est `False`, Python ne prend même pas la peine d'évaluer `b`, car le résultat sera forcément `False`.
*   Pour `a or b` : si `a` est `True`, Python n'évalue pas `b`, car le résultat sera forcément `True`.
Cela peut être utile si la deuxième expression a des effets de bord ou prend du temps à calculer.

## 4. Opérateurs d'Appartenance (Optionnel mais très utile)

Ces opérateurs testent si une valeur est présente dans une séquence (comme une liste, un tuple, une chaîne de caractères, ou les clés d'un dictionnaire).

| Opérateur | Description                                           | Exemple                                    | Résultat |
| :-------- | :---------------------------------------------------- | :----------------------------------------- | :------- |
| `in`      | Retourne `True` si la valeur est présente dans la séquence | `element in sequence`                    | `True`/`False` |
| `not in`  | Retourne `True` si la valeur n'est pas dans la séquence | `element not in sequence`                | `True`/`False` |

```python
fruits = ["pomme", "banane", "cerise"]
message = "Bonjour le monde"
scores = {"maths": 15, "anglais": 12}

# Opérateur in
print(f"'banane' in fruits : {'banane' in fruits}")           # True
print(f"'orange' in fruits : {'orange' in fruits}")           # False
print(f"'jour' in message : {'jour' in message}")             # True (sous-chaîne)
print(f"'maths' in scores : {'maths' in scores}")             # True (teste les clés du dictionnaire)
print(f"15 in scores.values() : {15 in scores.values()}")     # True (teste les valeurs du dictionnaire)

# Opérateur not in
print(f"'orange' not in fruits : {'orange' not in fruits}")   # True
print(f"'X' not in message : {'X' not in message}")           # True
```

## 5. Opérateurs d'Identité (Optionnel, pour une compréhension plus fine)

Ces opérateurs comparent si deux variables se réfèrent au **même objet en mémoire**, et non pas seulement si elles ont la même valeur.

| Opérateur | Description                                                 | Exemple                       | Résultat |
| :-------- | :---------------------------------------------------------- | :---------------------------- | :------- |
| `is`      | Retourne `True` si les deux variables pointent vers le même objet | `var1 is var2`                | `True`/`False` |
| `is not`  | Retourne `True` si les deux variables ne pointent pas vers le même objet | `var1 is not var2`            | `True`/`False` |

```python
# Pour les petits entiers et certaines chaînes, Python peut réutiliser les mêmes objets en mémoire pour économiser de l'espace.
x = 10
y = 10
z = x

print(f"x == y : {x == y}") # True (même valeur)
print(f"x is y : {x is y}") # True (pour les petits entiers, Python peut optimiser et utiliser le même objet)

a = "hello"
b = "hello"
print(f"a is b : {a is b}") # Souvent True pour les chaînes courtes (dû à l'internement des chaînes)

# Cas avec des listes (objets muables)
liste1 = [1, 2, 3]
liste2 = [1, 2, 3]
liste3 = liste1

print(f"liste1 == liste2 : {liste1 == liste2}") # True (elles ont le même contenu)
print(f"liste1 is liste2 : {liste1 is liste2}") # False (ce sont deux objets liste différents en mémoire)

print(f"liste1 == liste3 : {liste1 == liste3}") # True (même contenu)
print(f"liste1 is liste3 : {liste1 is liste3}") # True (liste3 est juste un autre nom pour le même objet que liste1)

# Modification de liste1 affecte liste3
liste1.append(4)
print(f"liste1 après ajout : {liste1}") # [1, 2, 3, 4]
print(f"liste3 après ajout sur liste1 : {liste3}") # [1, 2, 3, 4]
print(f"liste2 (inchangée) : {liste2}") # [1, 2, 3]

# Opérateur is not
print(f"liste1 is not liste2 : {liste1 is not liste2}") # True
print(f"liste1 is not liste3 : {liste1 is not liste3}") # False
```

**Quand utiliser `is` vs `==` ?**
*   Utilisez `==` (et `!=`) la plupart du temps lorsque vous voulez vérifier si deux variables ont la **même valeur**. C'est ce que vous voudrez faire dans 99% des cas.
*   Utilisez `is` (et `is not`) lorsque vous voulez spécifiquement vérifier si deux variables se réfèrent exactement au **même objet en mémoire**. C'est plus rare, souvent utilisé pour comparer avec `None` (car il n'y a qu'un seul objet `None` en mémoire) ou dans des contextes de programmation plus avancés.
    ```python
    valeur = None
    if valeur is None:
        print("La valeur est None (utilisation de 'is')")
    ```

Les opérateurs sont les outils qui vous permettent de "faire des choses" avec vos données. En les combinant avec des variables et des types de données, vous pouvez commencer à écrire des expressions et des logiques plus complexes. Le prochain module sur les structures de contrôle vous montrera comment utiliser les résultats de ces opérations (surtout les booléens des opérateurs de comparaison et logiques) pour diriger le flux de votre programme.
