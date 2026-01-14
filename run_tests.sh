#!/bin/bash

REQUIRED_JAVA_VERSION="21.0.2-tem"

export SDKMAN_DIR="$HOME/.sdkman"
if [[ -s "$SDKMAN_DIR/bin/sdkman-init.sh" ]]; then
    echo "Found SDKMAN. Configuring environment..."
    source "$SDKMAN_DIR/bin/sdkman-init.sh"
    
    if ! sdk use java $REQUIRED_JAVA_VERSION; then
        echo "Java $REQUIRED_JAVA_VERSION not found. Installing automatically..."
        echo "n" | sdk install java $REQUIRED_JAVA_VERSION
        sdk use java $REQUIRED_JAVA_VERSION
    fi
    
    if [[ -n "$SDKMAN_CANDIDATES_DIR" ]]; then
        export JAVA_HOME="$SDKMAN_CANDIDATES_DIR/java/$REQUIRED_JAVA_VERSION"
    fi
fi

if [[ "$OSTYPE" == "darwin"* ]] && [[ -z "$JAVA_HOME" ]]; then
    if [[ -x "/usr/libexec/java_home" ]]; then
        if /usr/libexec/java_home -v 21 >/dev/null 2>&1; then
            export JAVA_HOME=$(/usr/libexec/java_home -v 21)
            echo "MacOS: Automatically set JAVA_HOME to $($JAVA_HOME/bin/java -version 2>&1 | head -n 1)"
        fi
    fi
fi

if [ -n "$JAVA_HOME" ]; then
    echo "Using JAVA_HOME=$JAVA_HOME"
    export PATH="$JAVA_HOME/bin:$PATH"
else
    echo "JAVA_HOME is not set explicitly. Using system default 'java'."
fi

JAVA_VER=$(java -version 2>&1 | head -n 1 | awk -F '"' '{print $2}' | awk -F '.' '{print $1}')
echo "Current Java version: $JAVA_VER"

if [[ "$JAVA_VER" -ne "21" ]]; then
    echo "------------------------------------------------------------"
    echo "ERROR: Active Java version is $JAVA_VER, but Java 21 is required."
    echo "Auto-configuration failed. Please install Java 21."
    echo "------------------------------------------------------------"
    exit 1
fi

cd eitimoto-backend
./mvnw test
echo "Tests finished."
