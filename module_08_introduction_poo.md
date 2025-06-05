# Module 8: Introduction à la Programmation Orientée Objet (POO)

Jusqu'à présent, nous avons principalement utilisé la programmation procédurale : nous organisions notre code en fonctions qui effectuent des opérations sur des données. La **Programmation Orientée Objet (POO)** est un paradigme de programmation différent qui structure le code autour d'"objets". Un objet est une entité qui combine à la fois des données (appelées **attributs**) et des comportements ou actions (appelées **méthodes**) qui opèrent sur ces données.

Python est un langage multi-paradigme, ce qui signifie qu'il supporte la POO, mais ne vous force pas à l'utiliser. Cependant, la POO est très répandue et puissante pour modéliser des problèmes du monde réel et pour créer des programmes complexes et bien organisés.

## 1. Concepts de Base de la POO

*   **Pourquoi la POO ?**
    *   **Modélisation du Monde Réel :** La POO permet de représenter des entités du monde réel (comme une voiture, une personne, un compte bancaire) sous forme d'objets dans votre code, ce qui peut rendre la conception plus intuitive.
    *   **Organisation et Modularité :** Le code est mieux organisé car les données et les fonctions qui les manipulent sont regroupées au sein des objets. Cela favorise la modularité.
    *   **Réutilisabilité :** Les classes (modèles pour les objets) peuvent être réutilisées pour créer de multiples objets ou être étendues (via l'héritage) pour créer de nouvelles classes avec des fonctionnalités spécialisées.
    *   **Encapsulation :** Cacher les détails internes d'un objet et n'exposer qu'une interface contrôlée pour interagir avec lui. Cela protège les données de modifications accidentelles et simplifie l'utilisation de l'objet.
    *   **Héritage :** Permet à une classe (enfant) d'hériter des attributs et méthodes d'une autre classe (parente), favorisant la réutilisation de code et la création de hiérarchies de classes.
    *   **Polymorphisme :** (Concept plus avancé) Permet à des objets de types différents de répondre de la même manière à un même appel de méthode.

*   **Objets et Classes : L'Analogie**
    *   **Classe :** C'est un **plan**, un **modèle** ou un **moule** pour créer des objets. Elle définit les attributs (caractéristiques) que les objets de cette classe auront et les méthodes (actions) qu'ils pourront effectuer.
        *   *Analogie :* Le plan de construction d'une maison, un moule à gâteaux, la définition d'un "chien" (a des pattes, une couleur, peut aboyer).
    *   **Objet (ou Instance) :** C'est une **occurrence concrète** d'une classe. C'est une entité réelle que vous créez à partir du plan (la classe). Chaque objet a ses propres valeurs pour les attributs définis par la classe.
        *   *Analogie :* Une maison spécifique construite à partir du plan, un gâteau particulier fait avec le moule, votre chien "Médor" qui est une instance de la classe "chien".

    Vous définissez une classe une seule fois, mais vous pouvez créer de nombreux objets (instances) à partir de cette classe.

## 2. Classes

*   **Définition d'une Classe**
    En Python, on définit une classe avec le mot-clé `class` suivi du nom de la classe (par convention, en `PascalCase` ou `CamelCase`, c'est-à-dire avec une majuscule au début de chaque mot) et d'un double-point `:`.

    ```python
    class Chien:
        # Les attributs et méthodes de la classe seront définis ici
        pass # 'pass' signifie qu'il n'y a rien pour l'instant, mais la syntaxe est correcte

    class Voiture:
        pass
    ```

*   **Attributs**
    Les attributs sont des variables associées à une classe ou à un objet. Ils stockent l'état de l'objet.
    *   **Attributs de classe :** Ils sont partagés par toutes les instances de la classe. Définis directement sous la déclaration de la classe.
    *   **Attributs d'instance :** Ils sont spécifiques à chaque objet (instance) de la classe. Ils sont généralement initialisés dans une méthode spéciale appelée `__init__`.

*   **Méthodes**
    Les méthodes sont des fonctions définies à l'intérieur d'une classe. Elles définissent les comportements ou actions que les objets de la classe peuvent effectuer.
    La première méthode de presque toutes les méthodes d'instance est un paramètre spécial nommé `self` (par convention).

## 3. Objets (Instances)

*   **Création d'une Instance (Instanciation)**
    Pour créer un objet (une instance) à partir d'une classe, on appelle la classe comme si c'était une fonction :

    ```python
    mon_premier_chien = Chien() # Crée une instance de la classe Chien
    ma_belle_voiture = Voiture() # Crée une instance de la classe Voiture

    print(type(mon_premier_chien)) # Affiche : <class '__main__.Chien'>
    print(type(ma_belle_voiture)) # Affiche : <class '__main__.Voiture'>
    ```
    `mon_premier_chien` et `ma_belle_voiture` sont maintenant des objets.

*   **Le Constructeur `__init__()`**
    *   `__init__` est une méthode spéciale (appelée "dunder method" pour Double UNDERscore) qui est automatiquement appelée lorsque vous créez une nouvelle instance d'une classe.
    *   Son rôle principal est d'**initialiser les attributs d'instance** de l'objet.
    *   Le premier paramètre de `__init__` (et de la plupart des méthodes d'instance) est toujours `self`.

*   **Le Paramètre `self`**
    *   `self` représente l'**instance de l'objet lui-même** sur laquelle une méthode est appelée.
    *   Lorsque vous appelez une méthode sur un objet (par exemple, `mon_objet.ma_methode(arg1)`), Python passe automatiquement l'objet `mon_objet` comme premier argument à la méthode. C'est pourquoi `self` est le premier paramètre dans la définition de la méthode.
    *   À l'intérieur des méthodes de la classe, vous utilisez `self` pour accéder aux attributs et autres méthodes de cette instance spécifique. `self.attribut_nom = valeur`.

    ```python
    class Personne:
        # Le constructeur __init__
        def __init__(self, nom_personne, age_personne):
            # 'self' se réfère à l'instance qui est en train d'être créée
            # On crée des attributs d'instance : nom et age
            self.nom = nom_personne  # self.nom est un attribut de l'instance
            self.age = age_personne    # self.age est un attribut de l'instance
            print(f"Personne '{self.nom}' créée, âge {self.age} ans.")

        # Une autre méthode d'instance
        def saluer(self):
            print(f"Bonjour, je m'appelle {self.nom} et j'ai {self.age} ans.")

        def feter_anniversaire(self):
            self.age += 1
            print(f"Joyeux anniversaire {self.nom} ! Vous avez maintenant {self.age} ans.")

    # Création d'instances (objets) de la classe Personne
    # Python appelle automatiquement __init__ lors de la création
    # personne1 = Personne() # Erreur, car __init__ attend 'nom_personne' et 'age_personne'
    personne1 = Personne("Alice", 30) # "Alice" est passé à nom_personne, 30 à age_personne
                                      # self est géré automatiquement par Python
    personne2 = Personne("Bob", 25)

    # Accéder aux attributs d'instance (généralement déconseillé de le faire directement depuis l'extérieur si l'encapsulation est visée)
    print(f"Nom de personne1 : {personne1.nom}") # Alice
    print(f"Âge de personne2 : {personne2.age}") # 25

    # Appeler des méthodes sur les objets
    personne1.saluer() # Python passe personne1 comme argument 'self' à saluer()
    personne2.saluer()

    personne1.feter_anniversaire()
    personne1.saluer() # L'âge d'Alice a changé
    ```

    **Attributs de Classe (Exemple)**
    ```python
    class Chien:
        # Attribut de classe (partagé par toutes les instances)
        espece = "Canis familiaris"

        def __init__(self, nom_chien):
            self.nom = nom_chien # Attribut d'instance

    medor = Chien("Médor")
    rex = Chien("Rex")

    print(f"{medor.nom} est un {medor.espece}") # Médor est un Canis familiaris
    print(f"{rex.nom} est un {rex.espece}")   # Rex est un Canis familiaris
    print(f"Espèce (via la classe) : {Chien.espece}") # Canis familiaris

    # Si on modifie un attribut de classe, ça affecte toutes les instances qui n'ont pas
    # "caché" cet attribut par un attribut d'instance du même nom.
    # Chien.espece = "Loup domestique"
    # print(f"Nouvelle espèce pour Médor : {medor.espece}") # Loup domestique
    ```

## 4. Héritage (Introduction)

L'héritage est un mécanisme qui permet à une nouvelle classe (appelée **classe enfant** ou **classe dérivée**) d'hériter des attributs et des méthodes d'une classe existante (appelée **classe parente** ou **classe de base**).

*   **Concept de Base**
    *   La classe enfant peut réutiliser le code de la classe parente.
    *   La classe enfant peut ajouter ses propres attributs et méthodes spécifiques.
    *   La classe enfant peut **redéfinir** (override) les méthodes de la classe parente pour fournir une implémentation spécifique.

*   **Syntaxe de Base de l'Héritage**
    On spécifie la classe parente entre parenthèses après le nom de la classe enfant.

    ```python
    class Animal: # Classe parente
        def __init__(self, nom):
            self.nom = nom
            print("Animal créé.")

        def manger(self):
            print(f"{self.nom} mange.")

        def parler(self):
            print("L'animal fait un son.")

    class Chat(Animal): # Chat hérite d'Animal
        def __init__(self, nom, couleur_pelage):
            # Appeler le constructeur de la classe parente (Animal)
            # pour initialiser les attributs hérités (comme 'nom')
            super().__init__(nom) # 'super()' se réfère à la classe parente
            self.couleur_pelage = couleur_pelage # Attribut spécifique à Chat
            print("Chat créé.")

        # Redéfinition de la méthode parler (Override)
        def parler(self):
            print(f"{self.nom} miaule.")

        # Méthode spécifique à Chat
        def ronronner(self):
            print(f"{self.nom} ronronne...")

    # Création d'instances
    animal_generique = Animal("Générique")
    animal_generique.manger() # Générique mange.
    animal_generique.parler() # L'animal fait un son.

    print("---")

    mon_chat = Chat("Félix", "noir et blanc")
    mon_chat.manger() # Méthode héritée d'Animal : Félix mange.
    mon_chat.parler() # Méthode redéfinie dans Chat : Félix miaule.
    mon_chat.ronronner() # Méthode spécifique à Chat : Félix ronronne...
    print(f"Couleur du pelage de {mon_chat.nom}: {mon_chat.couleur_pelage}")
    ```
    La fonction `super()` est utilisée pour appeler des méthodes de la classe parente, typiquement le `__init__()` pour s'assurer que la partie parente de l'objet est correctement initialisée.

## 5. Encapsulation (Introduction)

L'encapsulation est l'un des piliers de la POO. Elle consiste à :
1.  **Regrouper** les données (attributs) et les méthodes qui opèrent sur ces données au sein d'un même objet.
2.  **Restreindre l'accès direct** aux détails internes de l'objet (ses attributs). L'interaction avec l'objet se fait via une interface publique (ses méthodes).

*   **Objectifs de l'Encapsulation :**
    *   **Protection des données :** Empêcher que les données internes d'un objet soient modifiées de manière incorrecte ou inattendue depuis l'extérieur.
    *   **Simplification de l'interface :** L'utilisateur de l'objet n'a pas besoin de connaître les détails complexes de son implémentation interne. Il utilise juste les méthodes fournies.
    *   **Flexibilité et Maintenance :** Le développeur de la classe peut modifier l'implémentation interne (par exemple, changer la façon dont un attribut est stocké) sans impacter le code qui utilise la classe, tant que l'interface publique (les méthodes) reste la même.

*   **Convention de Nommage pour les Attributs "Privés" en Python**
    Python n'a pas de mots-clés `private` ou `protected` stricts comme certains autres langages (Java, C++). L'encapsulation en Python repose beaucoup sur des conventions.
    *   **Tiret bas simple (`_variable`) :** C'est une **convention** pour indiquer qu'un attribut ou une méthode est destiné à un usage interne à la classe ou au module. Il n'y a pas de restriction technique, mais les autres développeurs comprendront qu'ils ne devraient pas y accéder directement de l'extérieur.
    *   **Double tiret bas (`__variable`) (Name Mangling) :** Lorsqu'un nom d'attribut commence par deux tirets bas (et ne se termine pas par deux tirets bas), Python modifie légèrement son nom pour le rendre plus difficile d'accès de l'extérieur (il le préfixe avec `_NomDeLaClasse`). Ce n'est pas une véritable protection, mais un mécanisme pour éviter les conflits de noms dans les classes enfants lors de l'héritage.

    ```python
    class CompteBancaire:
        def __init__(self, titulaire, solde_initial=0):
            self.titulaire = titulaire # Attribut public
            self._solde = solde_initial # Convention : attribut "protégé" ou interne
            self.__numero_compte = self._generer_numero_compte() # Attribut "privé" par name mangling

        def _generer_numero_compte(self):
            # Logique (simplifiée) pour générer un numéro de compte
            import random
            return random.randint(10000, 99999)

        def deposer(self, montant):
            if montant > 0:
                self._solde += montant
                print(f"Dépôt de {montant}€ effectué. Nouveau solde : {self._solde}€")
            else:
                print("Le montant du dépôt doit être positif.")

        def retirer(self, montant):
            if 0 < montant <= self._solde:
                self._solde -= montant
                print(f"Retrait de {montant}€ effectué. Nouveau solde : {self._solde}€")
            elif montant > self._solde:
                print("Solde insuffisant.")
            else:
                print("Le montant du retrait doit être positif.")

        def consulter_solde(self):
            # Fournit un accès contrôlé à _solde
            print(f"Solde actuel pour {self.titulaire}: {self._solde}€")
            return self._solde

        def get_numero_compte(self): # Getter pour __numero_compte
            return self.__numero_compte

    compte_alice = CompteBancaire("Alice", 1000)
    compte_alice.consulter_solde() # Solde actuel pour Alice: 1000€

    compte_alice.deposer(500)    # Dépôt de 500€ effectué. Nouveau solde : 1500€
    compte_alice.retirer(200)    # Retrait de 200€ effectué. Nouveau solde : 1300€
    compte_alice.retirer(1500)   # Solde insuffisant.

    # Accès direct à _solde (possible, mais déconseillé par la convention)
    # compte_alice._solde = -500 # On peut "casser" l'objet si on ne respecte pas l'interface
    # compte_alice.consulter_solde() # Solde actuel pour Alice: -500€ (ce qui ne devrait pas arriver)

    print(f"Numéro de compte d'Alice : {compte_alice.get_numero_compte()}")

    # Essayer d'accéder à __numero_compte directement :
    # print(compte_alice.__numero_compte) # AttributeError: 'CompteBancaire' object has no attribute '__numero_compte'

    # Python a "manglé" le nom :
    print(compte_alice._CompteBancaire__numero_compte) # Fonctionne, mais ne DEVRAIT PAS être utilisé
    ```
    L'idée est de fournir des méthodes publiques (comme `deposer`, `retirer`, `consulter_solde`) pour interagir avec l'objet, et de garder les attributs comme `_solde` comme des détails d'implémentation. Les "getters" (comme `get_numero_compte`) et "setters" (méthodes pour modifier un attribut de manière contrôlée) sont des moyens courants d'appliquer l'encapsulation.

Ce module n'est qu'une introduction à la POO. Des concepts plus avancés comme le polymorphisme, les décorateurs (`@property`, `@classmethod`, `@staticmethod`), l'héritage multiple, les classes abstraites, etc., sont des sujets pour des études plus approfondies. Cependant, avec les classes, les objets, `__init__`, `self`, l'héritage de base et l'encapsulation, vous avez déjà de quoi structurer vos programmes de manière beaucoup plus robuste et organisée.
