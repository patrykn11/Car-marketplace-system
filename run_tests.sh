#!/bin/bash
set -e  # zatrzymaj skrypt przy błędzie

# Ustaw JAVA_HOME na MacOS, jeśli nie jest ustawione
if [[ "$OSTYPE" == "darwin"* ]]; then
    if [[ -z "$JAVA_HOME" && -x "/usr/libexec/java_home" ]]; then
        if /usr/libexec/java_home -v 21 >/dev/null 2>&1; then
            export JAVA_HOME=$(/usr/libexec/java_home -v 21)
            echo "MacOS: Automatically set JAVA_HOME to $($JAVA_HOME/bin/java -version 2>&1 | head -n 1)"
        fi
    fi
fi

# Informacja o używanej Javie
if [ -n "$JAVA_HOME" ]; then
    echo "Using JAVA_HOME=$JAVA_HOME"
else
    echo "JAVA_HOME is not set. Using system default 'java'."
fi

# Sprawdzenie wersji Java
JAVA_VER=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}' | awk -F '.' '{print $1}')
if [[ "$JAVA_VER" -ne "21" ]]; then
    echo "WARNING: You are running Java $JAVA_VER. This project assumes Java 21."
    echo "If you encounter errors, please set JAVA_HOME to a JDK 21 installation."
fi

# Przejście do katalogu backend i uruchomienie testów Maven
cd eitimoto-backend
./mvnw test
echo "Tests finished."