document.addEventListener("DOMContentLoaded", function () {
    const blocklyDiv = document.getElementById('blocklyDiv');
    const toolbox = document.getElementById('toolbox');

    // Customizing the "Create a Function" feature to feel like "My Blocks"
    if (Blockly.Msg) {
        Blockly.Msg["PROCEDURES_DEFNORETURN_TITLE"] = "meu bloco";
        Blockly.Msg["PROCEDURES_DEFRETURN_TITLE"] = "meu bloco com retorno";
        Blockly.Msg["NEW_PROCEDURE"] = "Criar meu bloco...";
        Blockly.Msg["PROCEDURES_MUTATORCONTAINER_TITLE"] = "entradas";
    }

    // Defines Custom Blocks using Google Blockly JSON format
    Blockly.defineBlocksWithJsonArray([
        {
            "type": "event_when_started",
            "message0": "Quando Iniciar 🚀",
            "nextStatement": null,
            "colour": "#F6B316",
            "tooltip": "Início da execução do MicroPython.",
            "helpUrl": ""
        },
        {
            "type": "mcu_pin_setup",
            "message0": "Configurar Pino %1 como %2",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 2, "min": 0, "max": 40 },
                { "type": "field_dropdown", "name": "MODE", "options": [["SAÍDA (OUTPUT)", "Pin.OUT"], ["ENTRADA (INPUT)", "Pin.IN"], ["ENTRADA COM PULL-UP", "Pin.IN, Pin.PULL_UP"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#8e44ad",
            "tooltip": "Configura se o pino GPIO vai enviar dados (SAÍDA) ou receber (ENTRADA).",
            "helpUrl": ""
        },
        {
            "type": "mcu_pin_write",
            "message0": "Ajustar Pino %1 para %2",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 2 },
                { "type": "field_dropdown", "name": "VAL", "options": [["HIGH (Ligado)", "1"], ["LOW (Desligado)", "0"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#8e44ad",
            "tooltip": "Envia um sinal de 3.3v ou 5v (1) ou 0v (0) para o pino escolhido.",
            "helpUrl": ""
        },
        {
            "type": "mcu_pin_read",
            "message0": "Ler Pino %1",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 2 }
            ],
            "output": "Number",
            "colour": "#8e44ad",
            "tooltip": "Lê o sinal vindo do pino.",
            "helpUrl": ""
        },
        {
            "type": "mcu_pwm_setup",
            "message0": "Ativar PWM no Pino %1 Freq: %2",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 2 },
                { "type": "field_number", "name": "FREQ", "value": 1000 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3498db",
            "tooltip": "Inicia um sinal PWM (bom para LEDs dimmers e Motores DC).",
            "helpUrl": ""
        },
        {
            "type": "mcu_pwm_duty",
            "message0": "Ajustar PWM Pino %1 - Força(0-1023): %2",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 2 },
                { "type": "field_number", "name": "DUTY", "value": 512, "min": 0, "max": 1023 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#3498db",
            "tooltip": "Define a intensidade do pulso.",
            "helpUrl": ""
        },
        {
            "type": "mcu_servo_setup",
            "message0": "Configurar Servomotor no Pino %1",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 15 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e74c3c",
            "tooltip": "Prepara um pino para comunicação com MicroServo 9g (ou similar).",
            "helpUrl": ""
        },
        {
            "type": "mcu_servo_move",
            "message0": "Graus do Servo do Pino %1 para %2°",
            "args0": [
                { "type": "field_number", "name": "PIN", "value": 15 },
                { "type": "field_number", "name": "ANGLE", "value": 90, "min": 0, "max": 180 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e74c3c",
            "tooltip": "Move o braço do motor para o ângulo exato (0 a 180 graus).",
            "helpUrl": ""
        },
        {
            "type": "mcu_sleep",
            "message0": "Aguardar %1 segundos ⏳",
            "args0": [
                { "type": "field_number", "name": "SECONDS", "value": 1 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e67e22",
            "tooltip": "Pausa a execução do seu código pelo tempo determinado.",
            "helpUrl": ""
        },
        {
            "type": "pca9685_init",
            "message0": "Inicializar Driver PCA9685 %1 SDA: %2 SCL: %3 Freq: %4",
            "args0": [
                { "type": "field_dropdown", "name": "I2C_ID", "options": [["I2C 0", "0"], ["I2C 1", "1"]] },
                { "type": "field_number", "name": "SDA", "value": 21 },
                { "type": "field_number", "name": "SCL", "value": 22 },
                { "type": "field_number", "name": "FREQ", "value": 50 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#E91E63",
            "tooltip": "Configura o driver PCA9685 via I2C.",
            "helpUrl": ""
        },
        {
            "type": "pca9685_set_servo",
            "message0": "PCA9685 Canal %1 para %2°",
            "args0": [
                { "type": "input_value", "name": "CHANNEL", "check": "Number" },
                { "type": "input_value", "name": "ANGLE", "check": "Number" }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#E91E63",
            "tooltip": "Ajusta o ângulo de um servo conectado a um canal do PCA9685 (0-15).",
            "helpUrl": ""
        },
        {
            "type": "robot_arm_move",
            "message0": "Mover Braço 🦾 Base: %1 Ombro: %2 Cotovelo: %3 Garra: %4",
            "args0": [
                { "type": "field_number", "name": "BASE", "value": 90, "min": 0, "max": 180 },
                { "type": "field_number", "name": "SHOULDER", "value": 90, "min": 0, "max": 180 },
                { "type": "field_number", "name": "ELBOW", "value": 90, "min": 0, "max": 180 },
                { "type": "field_number", "name": "CLAW", "value": 90, "min": 0, "max": 180 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#673AB7",
            "tooltip": "Controla os 4 eixos principais de um braço robótico comum.",
            "helpUrl": ""
        },
        {
            "type": "robot_dance_preset",
            "message0": "Fazer Passo de Dança 🕺 %1 Velocidade: %2",
            "args0": [
                { "type": "field_dropdown", "name": "DANCE", "options": [
                    ["Ginga", "ginga"], 
                    ["Onda", "wave"], 
                    ["Moonwalk", "moonwalk"], 
                    ["Passo Lateral", "side_step"],
                    ["Comemoração", "celebrate"]
                ]},
                { "type": "field_dropdown", "name": "SPEED", "options": [["Lento", "200"], ["Médio", "100"], ["Rápido", "50"]] }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#FF5722",
            "tooltip": "Executa uma sequência de movimentos pré-programada.",
            "helpUrl": ""
        },
        {
            "type": "l298n_setup",
            "message0": "Configurar Ponte H L298N: IN1 %1 IN2 %2 IN3 %3 IN4 %4 ENA (Vel. A) %5 ENB (Vel. B) %6",
            "args0": [
                { "type": "field_number", "name": "IN1", "value": 12, "min": 0, "max": 40 },
                { "type": "field_number", "name": "IN2", "value": 13, "min": 0, "max": 40 },
                { "type": "field_number", "name": "IN3", "value": 14, "min": 0, "max": 40 },
                { "type": "field_number", "name": "IN4", "value": 27, "min": 0, "max": 40 },
                { "type": "field_number", "name": "ENA", "value": 25, "min": 0, "max": 40 },
                { "type": "field_number", "name": "ENB", "value": 26, "min": 0, "max": 40 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e74c3c",
            "tooltip": "Configura os pinos de entrada e controle de velocidade (PWM) para a ponte H L298N.",
            "helpUrl": ""
        },
        {
            "type": "l298n_motor",
            "message0": "Ponte H L298N: Motor %1 para %2 Velocidade (0-1023): %3",
            "args0": [
                { "type": "field_dropdown", "name": "MOTOR", "options": [["Motor A (IN1/IN2)", "A"], ["Motor B (IN3/IN4)", "B"]] },
                { "type": "field_dropdown", "name": "DIR", "options": [["Frente", "FORWARD"], ["Trás", "BACKWARD"], ["Parar", "STOP"]] },
                { "type": "field_number", "name": "SPEED", "value": 512, "min": 0, "max": 1023 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e74c3c",
            "tooltip": "Ajusta a direção de rotação e a velocidade (PWM) de um dos motores.",
            "helpUrl": ""
        },
        {
            "type": "l298n_robot",
            "message0": "Ponte H L298N: Mover Robô para %1 Velocidade (0-1023): %2",
            "args0": [
                { "type": "field_dropdown", "name": "DIR", "options": [["Frente ⬆️", "FORWARD"], ["Trás ⬇️", "BACKWARD"], ["Esquerda ↩️", "LEFT"], ["Direita ↪️", "RIGHT"], ["Parar 🛑", "STOP"]] },
                { "type": "field_number", "name": "SPEED", "value": 512, "min": 0, "max": 1023 }
            ],
            "previousStatement": null,
            "nextStatement": null,
            "colour": "#e74c3c",
            "tooltip": "Move o robô de duas rodas em uma direção controlando os dois motores simultaneamente.",
            "helpUrl": ""
        }
    ]);

    const pyGen = window.python ? window.python.pythonGenerator : window.Blockly.Python;

    if (!pyGen) {
        codeOutput.textContent = "# Erro crítico: Gerador Python do Blockly não encontrado.";
        return;
    }

    // --- Smart Combined Imports Logic ---
    // Engaja no ciclo de vida do Workspace do código Python
    const origInit = pyGen.init;
    pyGen.init = function (workspace) {
        origInit.call(this, workspace);
        this.machineImports_ = new Set(); // Guarda classes como 'Pin', 'PWM'
    };

    const origFinish = pyGen.finish;
    pyGen.finish = function (code) {
        // Se alguma classe da machine foi detectada, combina numa única linha
        if (this.machineImports_ && this.machineImports_.size > 0) {
            // Sort garante consistência visual (ex: from machine import PWM, Pin)
            const imports = Array.from(this.machineImports_).sort().join(', ');
            this.definitions_['import_machine_combined'] = `from machine import ${imports}`;
        }
        return origFinish.call(this, code);
    };
    // ------------------------------------

    pyGen.forBlock['event_when_started'] = function (block, generator) {
        // Agora, os imports são totalmente delegados aos blocos que os usam 
        // e ele não vai mais gerar import machine sozinho se não for usado!
        return "# --- INÍCIO DO SEU PROGRAMA MicroPython ---\n";
    };

    pyGen.forBlock['mcu_pin_setup'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        const pin = block.getFieldValue('PIN');
        const mode = block.getFieldValue('MODE');
        return `pin_${pin} = Pin(${pin}, ${mode})\n`;
    };

    pyGen.forBlock['mcu_pin_write'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        const pin = block.getFieldValue('PIN');
        const val = block.getFieldValue('VAL');
        return `pin_${pin}.value(${val})\n`;
    };

    pyGen.forBlock['mcu_pin_read'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        const pin = block.getFieldValue('PIN');
        return [`pin_${pin}.value()`, generator.ORDER_ATOMIC];
    };

    pyGen.forBlock['mcu_pwm_setup'] = function (block, generator) {
        generator.machineImports_.add('PWM');
        generator.machineImports_.add('Pin');
        const pin = block.getFieldValue('PIN');
        const freq = block.getFieldValue('FREQ');
        return `pwm_${pin} = PWM(Pin(${pin}))\npwm_${pin}.freq(${freq})\n`;
    };

    pyGen.forBlock['mcu_pwm_duty'] = function (block, generator) {
        generator.machineImports_.add('PWM');
        generator.machineImports_.add('Pin'); // Inclui a dependência nativa "Pin"
        const pin = block.getFieldValue('PIN');
        const duty = block.getFieldValue('DUTY');
        return `pwm_${pin}.duty(${duty})\n`;
    };

    pyGen.forBlock['mcu_servo_setup'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        generator.definitions_['import_servo'] = 'from servo import Servo';
        const pin = block.getFieldValue('PIN');
        return `servo_${pin} = Servo(Pin(${pin}))\n`;
    };

    pyGen.forBlock['mcu_servo_move'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        generator.definitions_['import_servo'] = 'from servo import Servo';
        const pin = block.getFieldValue('PIN');
        const angle = block.getFieldValue('ANGLE');
        return `servo_${pin}.write_angle(${angle})\n`;
    };

    pyGen.forBlock['mcu_sleep'] = function (block, generator) {
        generator.definitions_['import_time'] = 'import time';
        const seconds = block.getFieldValue('SECONDS');
        return `time.sleep(${seconds})\n`;
    };

    pyGen.forBlock['pca9685_init'] = function (block, generator) {
        generator.machineImports_.add('I2C');
        generator.machineImports_.add('Pin');
        generator.definitions_['import_pca9685'] = 'from pca9685 import PCA9685';
        const i2c_id = block.getFieldValue('I2C_ID');
        const sda = block.getFieldValue('SDA');
        const scl = block.getFieldValue('SCL');
        const freq = block.getFieldValue('FREQ');
        return `i2c = I2C(${i2c_id}, sda=Pin(${sda}), scl=Pin(${scl}))\npca = PCA9685(i2c)\npca.freq(${freq})\n`;
    };

    pyGen.forBlock['pca9685_set_servo'] = function (block, generator) {
        generator.definitions_['import_pca9685'] = 'from pca9685 import PCA9685';
        const channel = generator.valueToCode(block, 'CHANNEL', generator.ORDER_ATOMIC) || '0';
        const angle = generator.valueToCode(block, 'ANGLE', generator.ORDER_ATOMIC) || '90';
        return `pca.servo(${channel}, ${angle})\n`;
    };

    pyGen.forBlock['robot_arm_move'] = function (block, generator) {
        generator.definitions_['import_pca9685'] = 'from pca9685 import PCA9685';
        const base = block.getFieldValue('BASE');
        const shoulder = block.getFieldValue('SHOULDER');
        const elbow = block.getFieldValue('ELBOW');
        const claw = block.getFieldValue('CLAW');
        // Canais padrão para o braço: 0 (Base), 1 (Ombro), 2 (Cotovelo), 3 (Garra)
        return `pca.servo(0, ${base})\npca.servo(1, ${shoulder})\npca.servo(2, ${elbow})\npca.servo(3, ${claw})\n`;
    };

    pyGen.forBlock['robot_dance_preset'] = function (block, generator) {
        generator.definitions_['import_pca9685'] = 'from pca9685 import PCA9685';
        generator.definitions_['import_time'] = 'import time';
        const dance = block.getFieldValue('DANCE');
        const speed = block.getFieldValue('SPEED');
        
        let code = `# Executando passo de dança: ${dance}\n`;
        if (dance === 'ginga') {
            code += `for _ in range(3):\n    pca.servo(0, 70); time.sleep_ms(${speed})\n    pca.servo(0, 110); time.sleep_ms(${speed})\n`;
        } else if (dance === 'wave') {
            code += `for i in range(8):\n    pca.servo(i, 45); time.sleep_ms(50)\n    pca.servo(i, 135); time.sleep_ms(50)\n`;
        } else if (dance === 'moonwalk') {
            code += `for _ in range(5):\n    pca.servo(0, 45); pca.servo(1, 135); time.sleep_ms(${speed})\n    pca.servo(0, 135); pca.servo(1, 45); time.sleep_ms(${speed})\n`;
        } else {
            code += `pca.servo(0, 180); time.sleep_ms(${speed}); pca.servo(0, 0)\n`;
        }
        return code;
    };

    pyGen.forBlock['l298n_setup'] = function (block, generator) {
        generator.machineImports_.add('Pin');
        generator.machineImports_.add('PWM');
        const in1 = block.getFieldValue('IN1');
        const in2 = block.getFieldValue('IN2');
        const in3 = block.getFieldValue('IN3');
        const in4 = block.getFieldValue('IN4');
        const ena = block.getFieldValue('ENA');
        const enb = block.getFieldValue('ENB');
        
        let code = `# Configuração L298N: IN1=${in1}, IN2=${in2}, IN3=${in3}, IN4=${in4}, ENA=${ena}, ENB=${enb}\n`;
        code += `l298n_in1 = Pin(${in1}, Pin.OUT)\n`;
        code += `l298n_in2 = Pin(${in2}, Pin.OUT)\n`;
        code += `l298n_in3 = Pin(${in3}, Pin.OUT)\n`;
        code += `l298n_in4 = Pin(${in4}, Pin.OUT)\n`;
        code += `l298n_ena = PWM(Pin(${ena}))\nl298n_ena.freq(1000)\n`;
        code += `l298n_enb = PWM(Pin(${enb}))\nl298n_enb.freq(1000)\n`;
        return code;
    };

    pyGen.forBlock['l298n_motor'] = function (block, generator) {
        const motor = block.getFieldValue('MOTOR');
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        let code = `# Ponte H L298N: Motor ${motor}, ${dir === 'FORWARD' ? 'Frente' : (dir === 'BACKWARD' ? 'Trás' : 'Parar')}, Velocidade ${speed}\n`;
        if (motor === 'A') {
            if (dir === 'FORWARD') {
                code += `l298n_in1.value(1)\nl298n_in2.value(0)\nl298n_ena.duty(${speed})\n`;
            } else if (dir === 'BACKWARD') {
                code += `l298n_in1.value(0)\nl298n_in2.value(1)\nl298n_ena.duty(${speed})\n`;
            } else {
                code += `l298n_in1.value(0)\nl298n_in2.value(0)\nl298n_ena.duty(0)\n`;
            }
        } else {
            if (dir === 'FORWARD') {
                code += `l298n_in3.value(1)\nl298n_in4.value(0)\nl298n_enb.duty(${speed})\n`;
            } else if (dir === 'BACKWARD') {
                code += `l298n_in3.value(0)\nl298n_in4.value(1)\nl298n_enb.duty(${speed})\n`;
            } else {
                code += `l298n_in3.value(0)\nl298n_in4.value(0)\nl298n_enb.duty(0)\n`;
            }
        }
        return code;
    };

    pyGen.forBlock['l298n_robot'] = function (block, generator) {
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        const dirLabel = dir === 'FORWARD' ? 'Frente ⬆️' : (dir === 'BACKWARD' ? 'Trás ⬇️' : (dir === 'LEFT' ? 'Esquerda ↩️' : (dir === 'RIGHT' ? 'Direita ↪️' : 'Parar 🛑')));
        let code = `# Ponte H L298N: Mover Robô ${dirLabel}, Velocidade ${speed}\n`;
        if (dir === 'FORWARD') {
            code += `l298n_in1.value(1)\nl298n_in2.value(0)\nl298n_in3.value(1)\nl298n_in4.value(0)\nl298n_ena.duty(${speed})\nl298n_enb.duty(${speed})\n`;
        } else if (dir === 'BACKWARD') {
            code += `l298n_in1.value(0)\nl298n_in2.value(1)\nl298n_in3.value(0)\nl298n_in4.value(1)\nl298n_ena.duty(${speed})\nl298n_enb.duty(${speed})\n`;
        } else if (dir === 'LEFT') {
            code += `l298n_in1.value(0)\nl298n_in2.value(1)\nl298n_in3.value(1)\nl298n_in4.value(0)\nl298n_ena.duty(${speed})\nl298n_enb.duty(${speed})\n`;
        } else if (dir === 'RIGHT') {
            code += `l298n_in1.value(1)\nl298n_in2.value(0)\nl298n_in3.value(0)\nl298n_in4.value(1)\nl298n_ena.duty(${speed})\nl298n_enb.duty(${speed})\n`;
        } else {
            code += `l298n_in1.value(0)\nl298n_in2.value(0)\nl298n_in3.value(0)\nl298n_in4.value(0)\nl298n_ena.duty(0)\nl298n_enb.duty(0)\n`;
        }
        return code;
    };

    // --- JavaScript Generators for Custom Blocks ---
    const jsGen = Blockly.JavaScript;
    
    jsGen.forBlock['event_when_started'] = function (block, generator) {
        return "// --- INÍCIO DO SEU PROGRAMA JavaScript ---\n";
    };

    jsGen.forBlock['mcu_pin_setup'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const mode = block.getFieldValue('MODE');
        return `let pin_${pin} = hardware.Pin(${pin}, '${mode}');\n`;
    };

    jsGen.forBlock['mcu_pin_write'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const val = block.getFieldValue('VAL');
        return `pin_${pin}.write(${val});\n`;
    };

    jsGen.forBlock['mcu_pin_read'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        return [`pin_${pin}.read()`, generator.ORDER_ATOMIC];
    };

    jsGen.forBlock['mcu_pwm_setup'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const freq = block.getFieldValue('FREQ');
        return `let pwm_${pin} = hardware.PWM(${pin}, ${freq});\n`;
    };

    jsGen.forBlock['mcu_pwm_duty'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const duty = block.getFieldValue('DUTY');
        return `pwm_${pin}.setDuty(${duty});\n`;
    };

    jsGen.forBlock['mcu_servo_setup'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        return `let servo_${pin} = hardware.Servo(${pin});\n`;
    };

    jsGen.forBlock['mcu_servo_move'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const angle = block.getFieldValue('ANGLE');
        return `servo_${pin}.writeAngle(${angle});\n`;
    };

    jsGen.forBlock['mcu_sleep'] = function (block, generator) {
        const seconds = block.getFieldValue('SECONDS');
        return `await simulator.sleep(${seconds});\n`;
    };

    jsGen.forBlock['l298n_setup'] = function (block, generator) {
        const in1 = block.getFieldValue('IN1');
        const in2 = block.getFieldValue('IN2');
        const in3 = block.getFieldValue('IN3');
        const in4 = block.getFieldValue('IN4');
        const ena = block.getFieldValue('ENA');
        const enb = block.getFieldValue('ENB');
        
        let code = `// Configuração L298N: IN1=${in1}, IN2=${in2}, IN3=${in3}, IN4=${in4}, ENA=${ena}, ENB=${enb}\n`;
        code += `let l298n_in1 = hardware.Pin(${in1}, 'Pin.OUT');\n`;
        code += `let l298n_in2 = hardware.Pin(${in2}, 'Pin.OUT');\n`;
        code += `let l298n_in3 = hardware.Pin(${in3}, 'Pin.OUT');\n`;
        code += `let l298n_in4 = hardware.Pin(${in4}, 'Pin.OUT');\n`;
        code += `let l298n_ena = hardware.PWM(${ena}, 1000);\n`;
        code += `let l298n_enb = hardware.PWM(${enb}, 1000);\n`;
        return code;
    };

    jsGen.forBlock['l298n_motor'] = function (block, generator) {
        const motor = block.getFieldValue('MOTOR');
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        let code = `// Ponte H L298N: Motor ${motor}, ${dir === 'FORWARD' ? 'Frente' : (dir === 'BACKWARD' ? 'Trás' : 'Parar')}, Velocidade ${speed}\n`;
        if (motor === 'A') {
            if (dir === 'FORWARD') {
                code += `l298n_in1.write(1);\nl298n_in2.write(0);\nl298n_ena.setDuty(${speed});\n`;
            } else if (dir === 'BACKWARD') {
                code += `l298n_in1.write(0);\nl298n_in2.write(1);\nl298n_ena.setDuty(${speed});\n`;
            } else {
                code += `l298n_in1.write(0);\nl298n_in2.write(0);\nl298n_ena.setDuty(0);\n`;
            }
        } else {
            if (dir === 'FORWARD') {
                code += `l298n_in3.write(1);\nl298n_in4.write(0);\nl298n_enb.setDuty(${speed});\n`;
            } else if (dir === 'BACKWARD') {
                code += `l298n_in3.write(0);\nl298n_in4.write(1);\nl298n_enb.setDuty(${speed});\n`;
            } else {
                code += `l298n_in3.write(0);\nl298n_in4.write(0);\nl298n_enb.setDuty(0);\n`;
            }
        }
        return code;
    };

    jsGen.forBlock['l298n_robot'] = function (block, generator) {
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        const dirLabel = dir === 'FORWARD' ? 'Frente ⬆️' : (dir === 'BACKWARD' ? 'Trás ⬇️' : (dir === 'LEFT' ? 'Esquerda ↩️' : (dir === 'RIGHT' ? 'Direita ↪️' : 'Parar 🛑')));
        let code = `// Ponte H L298N: Mover Robô ${dirLabel}, Velocidade ${speed}\n`;
        if (dir === 'FORWARD') {
            code += `l298n_in1.write(1);\nl298n_in2.write(0);\nl298n_in3.write(1);\nl298n_in4.write(0);\nl298n_ena.setDuty(${speed});\nl298n_enb.setDuty(${speed});\n`;
        } else if (dir === 'BACKWARD') {
            code += `l298n_in1.write(0);\nl298n_in2.write(1);\nl298n_in3.write(0);\nl298n_in4.write(1);\nl298n_ena.setDuty(${speed});\nl298n_enb.setDuty(${speed});\n`;
        } else if (dir === 'LEFT') {
            code += `l298n_in1.write(0);\nl298n_in2.write(1);\nl298n_in3.write(1);\nl298n_in4.write(0);\nl298n_ena.setDuty(${speed});\nl298n_enb.setDuty(${speed});\n`;
        } else if (dir === 'RIGHT') {
            code += `l298n_in1.write(1);\nl298n_in2.write(0);\nl298n_in3.write(0);\nl298n_in4.write(1);\nl298n_ena.setDuty(${speed});\nl298n_enb.setDuty(${speed});\n`;
        } else {
            code += `l298n_in1.write(0);\nl298n_in2.write(0);\nl298n_in3.write(0);\nl298n_in4.write(0);\nl298n_ena.setDuty(0);\nl298n_enb.setDuty(0);\n`;
        }
        return code;
    };

    // --- C++ (Arduino Style) Generator ---
    const cppGen = new Blockly.Generator('C++');
    cppGen.PRECEDENCE = 0;

    cppGen.init = function (workspace) {
        this.definitions_ = Object.create(null);
        this.setups_ = Object.create(null);
        this.definitions_['arduino_h'] = '#include <Arduino.h>';
        if (!this.variableDB_) {
            this.variableDB_ = new Blockly.Names(this.RESERVED_WORDS_);
        } else {
            this.variableDB_.reset();
        }
    };

    cppGen.finish = function (code) {
        let definitions = [];
        for (let name in this.definitions_) definitions.push(this.definitions_[name]);
        let setups = [];
        for (let name in this.setups_) setups.push(this.setups_[name]);

        let finalCode = definitions.join('\n') + '\n\n';
        finalCode += 'void setup() {\n  ' + setups.join('\n  ') + '\n}\n\n';
        finalCode += 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}';
        return finalCode;
    };

    cppGen.scrub_ = function (block, code, opt_thisOnly) {
        const nextBlock = block.getNextBlock();
        const nextCode = (opt_thisOnly) ? '' : this.blockToCode(nextBlock);
        return code + nextCode;
    };

    // Mapeamento de Blocos Customizados para C++
    cppGen.forBlock['event_when_started'] = function (block, generator) { return ""; };
    cppGen.forBlock['mcu_pin_setup'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const mode = block.getFieldValue('MODE').includes('OUT') ? 'OUTPUT' : (block.getFieldValue('MODE').includes('PULL_UP') ? 'INPUT_PULLUP' : 'INPUT');
        generator.setups_['pin_mode_' + pin] = `pinMode(${pin}, ${mode});`;
        return "";
    };
    cppGen.forBlock['mcu_pin_write'] = function (block, generator) {
        const pin = block.getFieldValue('PIN');
        const val = block.getFieldValue('VAL') === '1' ? 'HIGH' : 'LOW';
        return `digitalWrite(${pin}, ${val});\n`;
    };
    cppGen.forBlock['mcu_sleep'] = function (block, generator) {
        const seconds = block.getFieldValue('SECONDS');
        return `delay(${seconds * 1000});\n`;
    };
    cppGen.forBlock['pca9685_init'] = function (block, generator) {
        generator.definitions_['wire_h'] = '#include <Wire.h>';
        generator.definitions_['pca_h'] = '#include <Adafruit_PWMServoDriver.h>';
        generator.definitions_['pca_obj'] = 'Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();';
        generator.setups_['pca_begin'] = 'pwm.begin();\npwm.setPWMFreq(50);';
        return "";
    };
    cppGen.forBlock['pca9685_set_servo'] = function (block, generator) {
        const channel = generator.valueToCode(block, 'CHANNEL', 0) || '0';
        const angle = generator.valueToCode(block, 'ANGLE', 0) || '90';
        return `pwm.setPWM(${channel}, 0, map(${angle}, 0, 180, 150, 600));\n`;
    };

    cppGen.forBlock['l298n_setup'] = function (block, generator) {
        const in1 = block.getFieldValue('IN1');
        const in2 = block.getFieldValue('IN2');
        const in3 = block.getFieldValue('IN3');
        const in4 = block.getFieldValue('IN4');
        const ena = block.getFieldValue('ENA');
        const enb = block.getFieldValue('ENB');
        
        generator.definitions_['l298n_pins_def'] = 
            `// Configuração L298N: IN1=${in1}, IN2=${in2}, IN3=${in3}, IN4=${in4}, ENA=${ena}, ENB=${enb}\n` +
            `const int l298n_in1 = ${in1};\n` +
            `const int l298n_in2 = ${in2};\n` +
            `const int l298n_in3 = ${in3};\n` +
            `const int l298n_in4 = ${in4};\n` +
            `const int l298n_ena = ${ena};\n` +
            `const int l298n_enb = ${enb};\n`;
            
        generator.setups_['l298n_pins_setup'] = 
            `pinMode(l298n_in1, OUTPUT);\n` +
            `  pinMode(l298n_in2, OUTPUT);\n` +
            `  pinMode(l298n_in3, OUTPUT);\n` +
            `  pinMode(l298n_in4, OUTPUT);\n` +
            `  pinMode(l298n_ena, OUTPUT);\n` +
            `  pinMode(l298n_enb, OUTPUT);`;
        return "";
    };

    cppGen.forBlock['l298n_motor'] = function (block, generator) {
        const motor = block.getFieldValue('MOTOR');
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        let code = `// Ponte H L298N: Motor ${motor}, ${dir === 'FORWARD' ? 'Frente' : (dir === 'BACKWARD' ? 'Trás' : 'Parar')}, Velocidade ${speed}\n`;
        if (motor === 'A') {
            if (dir === 'FORWARD') {
                code += `digitalWrite(l298n_in1, HIGH);\n` +
                        `digitalWrite(l298n_in2, LOW);\n` +
                        `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n`;
            } else if (dir === 'BACKWARD') {
                code += `digitalWrite(l298n_in1, LOW);\n` +
                        `digitalWrite(l298n_in2, HIGH);\n` +
                        `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n`;
            } else {
                code += `digitalWrite(l298n_in1, LOW);\n` +
                        `digitalWrite(l298n_in2, LOW);\n` +
                        `analogWrite(l298n_ena, 0);\n`;
            }
        } else {
            if (dir === 'FORWARD') {
                code += `digitalWrite(l298n_in3, HIGH);\n` +
                        `digitalWrite(l298n_in4, LOW);\n` +
                        `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
            } else if (dir === 'BACKWARD') {
                code += `digitalWrite(l298n_in3, LOW);\n` +
                        `digitalWrite(l298n_in4, HIGH);\n` +
                        `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
            } else {
                code += `digitalWrite(l298n_in3, LOW);\n` +
                        `digitalWrite(l298n_in4, LOW);\n` +
                        `analogWrite(l298n_enb, 0);\n`;
            }
        }
        return code;
    };

    cppGen.forBlock['l298n_robot'] = function (block, generator) {
        const dir = block.getFieldValue('DIR');
        const speed = block.getFieldValue('SPEED');
        
        const dirLabel = dir === 'FORWARD' ? 'Frente ⬆️' : (dir === 'BACKWARD' ? 'Trás ⬇️' : (dir === 'LEFT' ? 'Esquerda ↩️' : (dir === 'RIGHT' ? 'Direita ↪️' : 'Parar 🛑')));
        let code = `// Ponte H L298N: Mover Robô ${dirLabel}, Velocidade ${speed}\n`;
        if (dir === 'FORWARD') {
            code += `digitalWrite(l298n_in1, HIGH);\n` +
                    `digitalWrite(l298n_in2, LOW);\n` +
                    `digitalWrite(l298n_in3, HIGH);\n` +
                    `digitalWrite(l298n_in4, LOW);\n` +
                    `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n` +
                    `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
        } else if (dir === 'BACKWARD') {
            code += `digitalWrite(l298n_in1, LOW);\n` +
                    `digitalWrite(l298n_in2, HIGH);\n` +
                    `digitalWrite(l298n_in3, LOW);\n` +
                    `digitalWrite(l298n_in4, HIGH);\n` +
                    `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n` +
                    `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
        } else if (dir === 'LEFT') {
            code += `digitalWrite(l298n_in1, LOW);\n` +
                    `digitalWrite(l298n_in2, HIGH);\n` +
                    `digitalWrite(l298n_in3, HIGH);\n` +
                    `digitalWrite(l298n_in4, LOW);\n` +
                    `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n` +
                    `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
        } else if (dir === 'RIGHT') {
            code += `digitalWrite(l298n_in1, HIGH);\n` +
                    `digitalWrite(l298n_in2, LOW);\n` +
                    `digitalWrite(l298n_in3, LOW);\n` +
                    `digitalWrite(l298n_in4, HIGH);\n` +
                    `analogWrite(l298n_ena, map(${speed}, 0, 1023, 0, 255));\n` +
                    `analogWrite(l298n_enb, map(${speed}, 0, 1023, 0, 255));\n`;
        } else {
            code += `digitalWrite(l298n_in1, LOW);\n` +
                    `digitalWrite(l298n_in2, LOW);\n` +
                    `digitalWrite(l298n_in3, LOW);\n` +
                    `digitalWrite(l298n_in4, LOW);\n` +
                    `analogWrite(l298n_ena, 0);\n` +
                    `analogWrite(l298n_enb, 0);\n`;
        }
        return code;
    };

    const themeZelosDark = Blockly.Theme.defineTheme('zelosDark', {
        'base': Blockly.Themes.Zelos,
        'startHats': true,
        'componentStyles': {
            'workspaceBackgroundColour': '#0f111a',
            'toolboxBackgroundColour': '#1a1d27',
            'toolboxForegroundColour': '#adb5bd',
            'flyoutBackgroundColour': '#1a1d27',
            'flyoutForegroundColour': '#adb5bd',
            'flyoutOpacity': 0.9,
            'scrollbarColour': '#2b2f3a',
            'insertionMarkerColour': '#fff',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.4,
            'cursorColour': '#d0d0d0'
        }
    });

    const themeZelosLight = Blockly.Theme.defineTheme('zelosLight', {
        'base': Blockly.Themes.Zelos,
        'startHats': true,
        'componentStyles': {
            'workspaceBackgroundColour': '#f0f2f5',
            'toolboxBackgroundColour': '#ffffff',
            'toolboxForegroundColour': '#6b7280',
            'flyoutBackgroundColour': '#ffffff',
            'flyoutForegroundColour': '#6b7280',
            'flyoutOpacity': 0.9,
            'scrollbarColour': '#e5e7eb',
            'insertionMarkerColour': '#000',
            'insertionMarkerOpacity': 0.3,
            'scrollbarOpacity': 0.4,
            'cursorColour': '#333'
        }
    });

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const initialTheme = savedTheme === 'dark' ? themeZelosDark : themeZelosLight;

    const workspace = Blockly.inject(blocklyDiv, {
        toolbox: toolbox,
        scrollbars: true,
        trashcan: true,
        renderer: 'zelos',
        grid: { spacing: 25, length: 2, colour: 'rgba(157, 78, 221, 0.18)', snap: true },
        theme: initialTheme
    });

    // Injetar marca d'água de rodapé na sidebar
    function injectBrandCard() {
        const toolboxDiv = document.querySelector('.blocklyToolboxDiv');
        if (!toolboxDiv) {
            setTimeout(injectBrandCard, 50);
            return;
        }
        if (toolboxDiv.querySelector('.toolbox-brand-card')) return;

        const brandCard = document.createElement('div');
        brandCard.className = 'toolbox-brand-card';
        brandCard.innerHTML = `
            <img class="toolbox-brand-logo" src="https://brianws01.github.io/LP-ROBOTICA/img/logo.png" alt="Mini Makers Logo">
            <div class="toolbox-brand-info">
                <div class="toolbox-brand-title">Mini Makers IDE</div>
                <div class="toolbox-brand-version">Versão 1.0.0</div>
            </div>
        `;
        toolboxDiv.appendChild(brandCard);
    }
    injectBrandCard();

    // Lógica dos botões de controle de zoom e fullscreen
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const zoomResetBtn = document.getElementById('zoom-reset');
    const fullscreenBtn = document.getElementById('fullscreen-toggle');
    const toolSelectBtn = document.getElementById('tool-select');
    const toolPanBtn = document.getElementById('tool-pan');
    const workspaceContainer = document.querySelector('.workspace-area');

    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            if (workspace) workspace.zoomCenter(1);
        });
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            if (workspace) workspace.zoomCenter(-1);
        });
    }
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener('click', () => {
            if (workspace) workspace.zoomReset();
        });
    }
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                workspaceContainer.requestFullscreen().then(() => {
                    fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
                }).catch(err => {
                    console.error(`Error enabling full-screen: ${err.message}`);
                });
            } else {
                document.exitFullscreen().then(() => {
                    fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
                });
            }
        });
    }

    // Toggle de ferramenta (Seleção vs Mover)
    if (toolSelectBtn && toolPanBtn) {
        toolSelectBtn.addEventListener('click', () => {
            toolSelectBtn.classList.add('active');
            toolPanBtn.classList.remove('active');
        });
        toolPanBtn.addEventListener('click', () => {
            toolPanBtn.classList.add('active');
            toolSelectBtn.classList.remove('active');
        });
    }

    // Redimensionamento do workspace ao alternar fullscreen
    document.addEventListener('fullscreenchange', () => {
        setTimeout(() => {
            if (workspace) {
                Blockly.svgResize(workspace);
            }
        }, 100);
    });

    // --- CodeMirror Initialization ---
    const cmModeMap = {
        'python': 'python',
        'javascript': 'javascript',
        'cpp': 'text/x-c++src'
    };

    const cmEditor = CodeMirror(document.getElementById('code-editor'), {
        value: "# Arraste blocos ou digite código aqui...\n",
        mode: 'python',
        theme: savedTheme === 'dark' ? 'material-darker' : 'default',
        lineNumbers: true,
        indentUnit: 4,
        tabSize: 4,
        indentWithTabs: false,
        lineWrapping: false,
        matchBrackets: true,
        autoCloseBrackets: true
    });

    // --- Bidirectional Sync Flag ---
    let isUserEditing = false;
    let isSyncingFromBlocks = false;

    // Detect manual edits in CodeMirror
    cmEditor.on('change', (instance, changeObj) => {
        if (!isSyncingFromBlocks && changeObj.origin !== 'setValue') {
            isUserEditing = true;
        }
    });

    let currentCodeLang = 'python';

    function updateCode() {
        if (isUserEditing) return; // User is editing, don't overwrite

        isSyncingFromBlocks = true;
        let code = '';
        if (currentCodeLang === 'python') {
            code = pyGen.workspaceToCode(workspace);
            if (!code.trim()) code = "# Conecte blocos ou digite código aqui...\n";
        } else if (currentCodeLang === 'javascript') {
            code = jsGen.workspaceToCode(workspace);
            if (!code.trim()) code = "// Conecte blocos ou digite código aqui...\n";
        } else if (currentCodeLang === 'cpp') {
            code = cppGen.workspaceToCode(workspace);
            if (!code.trim() || code.split('\n').length < 6) code = "// Conecte blocos ou digite código aqui...\n";
        }
        cmEditor.setValue(code);
        cmEditor.setOption('mode', cmModeMap[currentCodeLang] || 'python');
        isSyncingFromBlocks = false;
    }

    // Lógica das Abas de Código (Tabs)
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCodeLang = btn.getAttribute('data-lang');
            isUserEditing = false; // Reset on tab change
            updateCode();
        });
    });

    // When blocks change, if the user isn't editing, update the editor
    workspace.addChangeListener((event) => {
        if (event.type === Blockly.Events.BLOCK_MOVE ||
            event.type === Blockly.Events.BLOCK_CHANGE ||
            event.type === Blockly.Events.BLOCK_CREATE ||
            event.type === Blockly.Events.BLOCK_DELETE) {
            if (!isUserEditing) {
                updateCode();
            }
        }
    });
    updateCode();

    const startBlock = workspace.newBlock('event_when_started');
    startBlock.initSvg();
    startBlock.render();
    startBlock.moveBy(50, 50);

    window.addEventListener('resize', function () {
        Blockly.svgResize(workspace);
        cmEditor.refresh();
    });

    // --- Copy Button ---
    document.getElementById('btn-copy').addEventListener('click', () => {
        const text = cmEditor.getValue();
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('btn-copy');
            const originalHTML = btn.innerHTML;
            btn.classList.add('success');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalHTML;
            }, 2000);
        });
    });

    // --- SYNC BUTTON: Code → Blocks ---
    document.getElementById('btn-sync').addEventListener('click', () => {
        const code = cmEditor.getValue();
        const syncBtn = document.getElementById('btn-sync');
        syncBtn.classList.add('syncing');

        try {
            workspace.clear();

            // Always add the start block
            const startBlk = workspace.newBlock('event_when_started');
            startBlk.initSvg();
            startBlk.render();
            startBlk.moveBy(50, 50);

            let parsedTree;
            if (currentCodeLang === 'python') {
                parsedTree = parsePythonToBlocks(code);
            } else if (currentCodeLang === 'javascript') {
                parsedTree = parseJSToBlocks(code);
            } else if (currentCodeLang === 'cpp') {
                parsedTree = parseCppToBlocks(code);
            }

            if (parsedTree && parsedTree.length > 0) {
                buildBlockChain(startBlk, parsedTree);
            }

            isUserEditing = false;
            syncBtn.classList.remove('syncing');
            syncBtn.classList.add('success');
            syncBtn.innerHTML = '<i class="fa-solid fa-check"></i> Pronto!';
            setTimeout(() => {
                syncBtn.classList.remove('success');
                syncBtn.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Sincronizar';
            }, 2000);
        } catch (err) {
            console.error('Sync error:', err);
            syncBtn.classList.remove('syncing');
            alert('Erro ao sincronizar: ' + err.message);
        }
    });

    // === BLOCK BUILDER (handles nesting) ===
    function buildBlockChain(parentBlock, blockList) {
        let lastBlock = parentBlock;
        blockList.forEach(blockInfo => {
            try {
                const newBlock = workspace.newBlock(blockInfo.type);
                for (let field in blockInfo.fields) {
                    try { newBlock.setFieldValue(blockInfo.fields[field], field); } catch(e) {}
                }

                // Handle value inputs (like boolean TRUE for while loops)
                if (blockInfo.values) {
                    for (let inputName in blockInfo.values) {
                        const valInfo = blockInfo.values[inputName];
                        const valBlock = workspace.newBlock(valInfo.type);
                        for (let f in valInfo.fields) {
                            try { valBlock.setFieldValue(valInfo.fields[f], f); } catch(e) {}
                        }
                        valBlock.initSvg();
                        valBlock.render();
                        if (newBlock.getInput(inputName) && newBlock.getInput(inputName).connection) {
                            newBlock.getInput(inputName).connection.connect(valBlock.outputConnection);
                        }
                    }
                }

                newBlock.initSvg();
                newBlock.render();

                // Connect to the previous block in the chain
                if (lastBlock.nextConnection && newBlock.previousConnection) {
                    lastBlock.nextConnection.connect(newBlock.previousConnection);
                }

                // If this block has children (e.g., loop body), build them inside
                if (blockInfo.children && blockInfo.children.length > 0) {
                    const doInput = newBlock.getInput('DO');
                    if (doInput && doInput.connection) {
                        // Create the first child and connect to the DO input
                        let firstChild = null;
                        let lastChild = null;
                        blockInfo.children.forEach(childInfo => {
                            const childBlock = workspace.newBlock(childInfo.type);
                            for (let f in childInfo.fields) {
                                try { childBlock.setFieldValue(childInfo.fields[f], f); } catch(e) {}
                            }
                            childBlock.initSvg();
                            childBlock.render();
                            if (!firstChild) {
                                firstChild = childBlock;
                                doInput.connection.connect(childBlock.previousConnection);
                            } else {
                                if (lastChild.nextConnection && childBlock.previousConnection) {
                                    lastChild.nextConnection.connect(childBlock.previousConnection);
                                }
                            }
                            lastChild = childBlock;
                        });
                    }
                }

                lastBlock = newBlock;
            } catch(e) {
                console.warn('Could not create block:', blockInfo.type, e);
            }
        });
    }

    // === REVERSE PARSERS ===

    // Helper: parse a single line into a block info object
    function parsePythonLine(line) {
        let m;
        if ((m = line.match(/^# Configuração L298N: IN1=(\d+), IN2=(\d+), IN3=(\d+), IN4=(\d+), ENA=(\d+), ENB=(\d+)/))) {
            return { type: 'l298n_setup', fields: { IN1: m[1], IN2: m[2], IN3: m[3], IN4: m[4], ENA: m[5], ENB: m[6] } };
        }
        if ((m = line.match(/^# Ponte H L298N: Motor (\w), (Frente|Trás|Parar), Velocidade (\d+)/))) {
            const motor = m[1];
            const dir = m[2] === 'Frente' ? 'FORWARD' : (m[2] === 'Trás' ? 'BACKWARD' : 'STOP');
            const speed = m[3];
            return { type: 'l298n_motor', fields: { MOTOR: motor, DIR: dir, SPEED: speed } };
        }
        if ((m = line.match(/^# Ponte H L298N: Mover Robô (Frente ⬆️|Trás ⬇️|Esquerda ↩️|Direita ↪️|Parar 🛑), Velocidade (\d+)/))) {
            const dirMap = {
                'Frente ⬆️': 'FORWARD',
                'Trás ⬇️': 'BACKWARD',
                'Esquerda ↩️': 'LEFT',
                'Direita ↪️': 'RIGHT',
                'Parar 🛑': 'STOP'
            };
            return { type: 'l298n_robot', fields: { DIR: dirMap[m[1]] || 'FORWARD', SPEED: m[2] } };
        }
        if (line.match(/^l298n_(in\d+|ena|enb)/)) return null;

        if ((m = line.match(/^pin_(\d+)\s*=\s*Pin\((\d+),\s*(Pin\.\w+(?:,\s*Pin\.\w+)?)\)/)))
            return { type: 'mcu_pin_setup', fields: { PIN: m[2], MODE: m[3] } };
        if ((m = line.match(/^pin_(\d+)\.value\((\d)\)/)))
            return { type: 'mcu_pin_write', fields: { PIN: m[1], VAL: m[2] } };
        if ((m = line.match(/^time\.sleep\((\d+\.?\d*)\)/)))
            return { type: 'mcu_sleep', fields: { SECONDS: m[1] } };
        if ((m = line.match(/^pwm_(\d+)\s*=\s*PWM\(Pin\((\d+)\)\)/)))
            return { type: 'mcu_pwm_setup', fields: { PIN: m[2], FREQ: '1000' } };
        if ((m = line.match(/^pwm_(\d+)\.freq\((\d+)\)/)))
            return null; // freq is part of setup, skip
        if ((m = line.match(/^pwm_(\d+)\.duty\((\d+)\)/)))
            return { type: 'mcu_pwm_duty', fields: { PIN: m[1], DUTY: m[2] } };
        if ((m = line.match(/^servo_(\d+)\s*=\s*Servo\(Pin\((\d+)\)\)/)))
            return { type: 'mcu_servo_setup', fields: { PIN: m[2] } };
        if ((m = line.match(/^servo_(\d+)\.write_angle\((\d+)\)/)))
            return { type: 'mcu_servo_move', fields: { PIN: m[1], ANGLE: m[2] } };
        if ((m = line.match(/^i2c\s*=\s*I2C\((\d+),\s*sda=Pin\((\d+)\),\s*scl=Pin\((\d+)\)\)/)))
            return { type: 'pca9685_init', fields: { I2C_ID: m[1], SDA: m[2], SCL: m[3], FREQ: '50' } };
        if ((m = line.match(/^pca\s*=\s*PCA9685/))) return null; // part of init
        if ((m = line.match(/^pca\.freq/))) return null; // part of init
        if ((m = line.match(/^pca\.servo\((\d+),\s*(\d+)\)/)))
            return { type: 'pca9685_set_servo', fields: {} };
        return null;
    }

    function parsePythonToBlocks(code) {
        const blocks = [];
        const lines = code.split('\n');
        let i = 0;
        while (i < lines.length) {
            const raw = lines[i];
            const trimmed = raw.trim();
            if (!trimmed || (trimmed.startsWith('#') && !trimmed.includes('Configuração L298N') && !trimmed.includes('Ponte H L298N')) || trimmed.startsWith('from ') || trimmed.startsWith('import ')) { i++; continue; }

            // Detect while True:
            if (trimmed.match(/^while\s+True\s*:/)) {
                const children = [];
                i++;
                // Collect indented lines as children
                while (i < lines.length) {
                    const childRaw = lines[i];
                    if (childRaw.trim() === '' || /^\s/.test(childRaw)) {
                        const childTrimmed = childRaw.trim();
                        if (childTrimmed) {
                            const childBlock = parsePythonLine(childTrimmed);
                            if (childBlock) children.push(childBlock);
                        }
                        i++;
                    } else break;
                }
                blocks.push({
                    type: 'controls_whileUntil',
                    fields: { MODE: 'WHILE' },
                    values: { BOOL: { type: 'logic_boolean', fields: { BOOL: 'TRUE' } } },
                    children: children
                });
                continue;
            }

            const block = parsePythonLine(trimmed);
            if (block) blocks.push(block);
            i++;
        }
        return blocks;
    }

    function parseJSLine(line) {
        let m;
        if ((m = line.match(/^\/\/ Configuração L298N: IN1=(\d+), IN2=(\d+), IN3=(\d+), IN4=(\d+), ENA=(\d+), ENB=(\d+)/))) {
            return { type: 'l298n_setup', fields: { IN1: m[1], IN2: m[2], IN3: m[3], IN4: m[4], ENA: m[5], ENB: m[6] } };
        }
        if ((m = line.match(/^\/\/ Ponte H L298N: Motor (\w), (Frente|Trás|Parar), Velocidade (\d+)/))) {
            const motor = m[1];
            const dir = m[2] === 'Frente' ? 'FORWARD' : (m[2] === 'Trás' ? 'BACKWARD' : 'STOP');
            const speed = m[3];
            return { type: 'l298n_motor', fields: { MOTOR: motor, DIR: dir, SPEED: speed } };
        }
        if ((m = line.match(/^\/\/ Ponte H L298N: Mover Robô (Frente ⬆️|Trás ⬇️|Esquerda ↩️|Direita ↪️|Parar 🛑), Velocidade (\d+)/))) {
            const dirMap = {
                'Frente ⬆️': 'FORWARD',
                'Trás ⬇️': 'BACKWARD',
                'Esquerda ↩️': 'LEFT',
                'Direita ↪️': 'RIGHT',
                'Parar 🛑': 'STOP'
            };
            return { type: 'l298n_robot', fields: { DIR: dirMap[m[1]] || 'FORWARD', SPEED: m[2] } };
        }
        if (line.match(/^l298n_(in\d+|ena|enb)/)) return null;
        if (line.match(/^let\s+l298n_(in\d+|ena|enb)/)) return null;

        if ((m = line.match(/let\s+pin_(\d+)\s*=\s*hardware\.Pin\((\d+),\s*'([^']+)'\)/)))
            return { type: 'mcu_pin_setup', fields: { PIN: m[2], MODE: m[3] } };
        if ((m = line.match(/pin_(\d+)\.write\((\d)\)/)))
            return { type: 'mcu_pin_write', fields: { PIN: m[1], VAL: m[2] } };
        if ((m = line.match(/await\s+simulator\.sleep\((\d+\.?\d*)\)/)))
            return { type: 'mcu_sleep', fields: { SECONDS: m[1] } };
        if ((m = line.match(/let\s+pwm_(\d+)\s*=\s*hardware\.PWM\((\d+),\s*(\d+)\)/)))
            return { type: 'mcu_pwm_setup', fields: { PIN: m[2], FREQ: m[3] } };
        if ((m = line.match(/pwm_(\d+)\.setDuty\((\d+)\)/)))
            return { type: 'mcu_pwm_duty', fields: { PIN: m[1], DUTY: m[2] } };
        if ((m = line.match(/let\s+servo_(\d+)\s*=\s*hardware\.Servo\((\d+)\)/)))
            return { type: 'mcu_servo_setup', fields: { PIN: m[2] } };
        if ((m = line.match(/servo_(\d+)\.writeAngle\((\d+)\)/)))
            return { type: 'mcu_servo_move', fields: { PIN: m[1], ANGLE: m[2] } };
        return null;
    }

    function parseJSToBlocks(code) {
        const blocks = [];
        const lines = code.split('\n');
        let i = 0;
        while (i < lines.length) {
            const trimmed = lines[i].trim();
            if (!trimmed || (trimmed.startsWith('//') && !trimmed.includes('Configuração L298N') && !trimmed.includes('Ponte H L298N')) || trimmed === '}') { i++; continue; }

            // Detect while (true) {
            if (trimmed.match(/^while\s*\(\s*true\s*\)\s*\{?/)) {
                const children = [];
                i++;
                while (i < lines.length) {
                    const ct = lines[i].trim();
                    if (ct === '}') { i++; break; }
                    if (ct) {
                        const cb = parseJSLine(ct);
                        if (cb) children.push(cb);
                    }
                    i++;
                }
                blocks.push({
                    type: 'controls_whileUntil',
                    fields: { MODE: 'WHILE' },
                    values: { BOOL: { type: 'logic_boolean', fields: { BOOL: 'TRUE' } } },
                    children: children
                });
                continue;
            }

            const block = parseJSLine(trimmed);
            if (block) blocks.push(block);
            i++;
        }
        return blocks;
    }

    function parseCppLine(line) {
        let m;
        if ((m = line.match(/^\/\/ Configuração L298N: IN1=(\d+), IN2=(\d+), IN3=(\d+), IN4=(\d+), ENA=(\d+), ENB=(\d+)/))) {
            return { type: 'l298n_setup', fields: { IN1: m[1], IN2: m[2], IN3: m[3], IN4: m[4], ENA: m[5], ENB: m[6] } };
        }
        if ((m = line.match(/^\/\/ Ponte H L298N: Motor (\w), (Frente|Trás|Parar), Velocidade (\d+)/))) {
            const motor = m[1];
            const dir = m[2] === 'Frente' ? 'FORWARD' : (m[2] === 'Trás' ? 'BACKWARD' : 'STOP');
            const speed = m[3];
            return { type: 'l298n_motor', fields: { MOTOR: motor, DIR: dir, SPEED: speed } };
        }
        if ((m = line.match(/^\/\/ Ponte H L298N: Mover Robô (Frente ⬆️|Trás ⬇️|Esquerda ↩️|Direita ↪️|Parar 🛑), Velocidade (\d+)/))) {
            const dirMap = {
                'Frente ⬆️': 'FORWARD',
                'Trás ⬇️': 'BACKWARD',
                'Esquerda ↩️': 'LEFT',
                'Direita ↪️': 'RIGHT',
                'Parar 🛑': 'STOP'
            };
            return { type: 'l298n_robot', fields: { DIR: dirMap[m[1]] || 'FORWARD', SPEED: m[2] } };
        }
        if (line.match(/^l298n_(in\d+|ena|enb)/)) return null;
        if (line.match(/^(const\s+int\s+)?l298n_(in\d+|ena|enb)/)) return null;
        if (line.match(/^pinMode\(l298n_(in\d+|ena|enb)/)) return null;
        if (line.match(/^digitalWrite\(l298n_(in\d+|ena|enb)/)) return null;
        if (line.match(/^analogWrite\(l298n_(in\d+|ena|enb)/)) return null;

        if ((m = line.match(/pinMode\((\d+),\s*(OUTPUT|INPUT|INPUT_PULLUP)\)/))) {
            const modeMap = { 'OUTPUT': 'Pin.OUT', 'INPUT': 'Pin.IN', 'INPUT_PULLUP': 'Pin.IN, Pin.PULL_UP' };
            return { type: 'mcu_pin_setup', fields: { PIN: m[1], MODE: modeMap[m[2]] || m[2] } };
        }
        if ((m = line.match(/digitalWrite\((\d+),\s*(HIGH|LOW)\)/)))
            return { type: 'mcu_pin_write', fields: { PIN: m[1], VAL: m[2] === 'HIGH' ? '1' : '0' } };
        if ((m = line.match(/delay\((\d+)\)/)))
            return { type: 'mcu_sleep', fields: { SECONDS: String(parseInt(m[1]) / 1000) } };
        if (line.includes('pwm.begin()'))
            return { type: 'pca9685_init', fields: { I2C_ID: '0', SDA: '21', SCL: '22', FREQ: '50' } };
        if ((m = line.match(/pwm\.setPWM\((\d+),/)))
            return { type: 'pca9685_set_servo', fields: {} };
        return null;
    }

    function parseCppToBlocks(code) {
        const blocks = [];
        const lines = code.split('\n');
        let i = 0;
        // In C++ the loop body is in void loop() { ... }
        let inLoop = false;
        let loopChildren = [];

        while (i < lines.length) {
            const trimmed = lines[i].trim();
            if (!trimmed || (trimmed.startsWith('//') && !trimmed.includes('Configuração L298N') && !trimmed.includes('Ponte H L298N')) || trimmed.startsWith('#include') || trimmed === '{' || trimmed === '}') {
                if (trimmed === '}' && inLoop) {
                    // End of while block
                    blocks.push({
                        type: 'controls_whileUntil',
                        fields: { MODE: 'WHILE' },
                        values: { BOOL: { type: 'logic_boolean', fields: { BOOL: 'TRUE' } } },
                        children: loopChildren
                    });
                    inLoop = false;
                    loopChildren = [];
                }
                i++; continue;
            }
            if (trimmed.startsWith('void ') || trimmed.startsWith('Adafruit_')) { i++; continue; }

            // Detect while (true/1) {
            if (trimmed.match(/^while\s*\(\s*(true|1)\s*\)\s*\{?/)) {
                inLoop = true;
                loopChildren = [];
                i++;
                continue;
            }

            const block = parseCppLine(trimmed);
            if (block) {
                if (inLoop) {
                    loopChildren.push(block);
                } else {
                    blocks.push(block);
                }
            }
            i++;
        }
        return blocks;
    }

    // -- Dropdown Logic --
    const menuFile = document.getElementById('menu-file');
    const dropdown = menuFile.closest('.dropdown');
    menuFile.addEventListener('click', (e) => {
        dropdown.classList.toggle('active');
        e.stopPropagation();
    });
    window.addEventListener('click', () => {
        if (dropdown.classList.contains('active')) {
            dropdown.classList.remove('active');
        }
    });

    // -- Save & Load Logic --
    document.getElementById('action-save').addEventListener('click', (e) => {
        e.preventDefault();
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        const blob = new Blob([xmlText], { type: 'text/xml' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'projeto_mcu.xml';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    const fileInput = document.getElementById('file-input');
    document.getElementById('action-open').addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

    // Export Python Logic
    const btnExportPy = document.getElementById('action-export-py');
    if (btnExportPy) {
        btnExportPy.addEventListener('click', (e) => {
            e.preventDefault();
            const pythonCode = pyGen.workspaceToCode(workspace);
            if (!pythonCode.trim()) {
                alert("O espaço de trabalho está vazio.");
                return;
            }
            const blob = new Blob([pythonCode], { type: 'text/x-python' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'main.py';
            a.click();
            URL.revokeObjectURL(a.href);
        });
    }

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const xmlDom = Blockly.utils.xml.textToDom(e.target.result);
                workspace.clear();
                Blockly.Xml.domToWorkspace(xmlDom, workspace);
            } catch (err) {
                alert("Erro ao carregar arquivo XML!");
            }
        };
        reader.readAsText(file);
        fileInput.value = ''; // Reset
    });

    // -- Splitter Logic --
    const splitter = document.getElementById('resize-divider');
    const workspaceArea = document.getElementById('blocklyDiv');
    const codeArea = document.querySelector('.code-area');
    const mainLayout = document.querySelector('.main-layout');
    
    let isDragging = false;

    splitter.addEventListener('mousedown', (e) => {
        isDragging = true;
        splitter.classList.add('dragging');
        document.body.style.cursor = 'col-resize';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const totalWidth = mainLayout.clientWidth;
        let newWidth = (e.clientX / totalWidth) * 100;
        
        if (newWidth < 20) newWidth = 20;
        if (newWidth > 80) newWidth = 80;

        workspaceArea.style.width = `${newWidth}%`;
        codeArea.style.width = `${100 - newWidth}%`;
        Blockly.svgResize(workspace);
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            splitter.classList.remove('dragging');
            document.body.style.cursor = 'default';
            Blockly.svgResize(workspace);
        }
    });

    // -- Modal & Terminal Logic --
    const modal = document.getElementById('connection-modal');
    const btnUpload = document.getElementById('btn-upload');
    const closeBtns = document.querySelectorAll('.close-modal');
    const btnConnect = document.getElementById('btn-connect-serial');
    const loader = document.querySelector('.loader-container');
    const termOutput = document.getElementById('terminal-output');

    const addLog = (msg, type = '') => {
        const div = document.createElement('div');
        div.className = `log ${type}`;
        div.textContent = msg;
        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    };

    document.getElementById('btn-clear-term').addEventListener('click', () => {
        termOutput.innerHTML = '';
    });

    // Helper para resetar o estado visual do modal
    function resetModalUI() {
        loader.style.display = 'none';
        btnConnect.style.display = 'block';
    }

    // Único event listener do btn-upload (removido o duplicado)
    btnUpload.addEventListener('click', async () => {
        if (!isConnected) {
            resetModalUI();
            modal.classList.remove('hidden');
        } else {
            await uploadPythonCode();
        }
    });

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        modal.classList.add('hidden');
        resetModalUI(); // Garante reset ao fechar
    }));

    // -- Web Serial API Integration --
    let port;
    let reader;
    let isConnected = false;
    const serialLed = document.getElementById('serial-led');

    // Helper para atualizar o LED de status
    function updateSerialLed(connected) {
        if (serialLed) {
            if (connected) {
                serialLed.classList.add('connected');
            } else {
                serialLed.classList.remove('connected');
            }
        }
    }

    // Verifica suporte do navegador
    function checkWebSerialSupport() {
        if (!('serial' in navigator)) {
            addLog("> ⚠ Web Serial API não suportada neste navegador!", "error");
            addLog("> Use Google Chrome ou Microsoft Edge.", "error");
            return false;
        }
        return true;
    }

    async function connectSerial() {
        if (!checkWebSerialSupport()) {
            resetModalUI();
            return;
        }

        try {
            // requestPort() abre o seletor nativo do navegador
            port = await navigator.serial.requestPort();
            
            addLog("> Porta selecionada. Abrindo conexão...", "system");
            
            await port.open({ baudRate: 115200 }); // Padrão ESP32/MicroPython
            
            isConnected = true;
            updateSerialLed(true);
            addLog("> ✅ Conectado via Web Serial com sucesso!", "system");
            
            // Atualiza o botão de upload para indicar que está conectado
            btnUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Enviar Código';
            
            // Oculta modal
            modal.classList.add('hidden');
            resetModalUI();
            
            // Inicia leitura da serial
            readLoop();

        } catch (err) {
            console.error("Erro na conexão Serial:", err);
            
            if (err.name === 'NotFoundError') {
                addLog("> Nenhuma porta foi selecionada.", "warning");
            } else if (err.name === 'SecurityError') {
                addLog("> Permissão negada. Tente novamente.", "error");
            } else if (err.name === 'InvalidStateError') {
                addLog("> A porta já está aberta em outro processo.", "error");
            } else {
                addLog("> Erro ao conectar: " + err.message, "error");
            }
            
            // RESET da UI do modal para permitir retry
            resetModalUI();
        }
    }

    // Escuta desconexão física do dispositivo (unplug)
    if ('serial' in navigator) {
        navigator.serial.addEventListener('disconnect', (event) => {
            if (isConnected && port && event.target === port) {
                addLog("> ⚠ Dispositivo removido fisicamente.", "warning");
                disconnectSerial();
            }
        });
    }

    async function disconnectSerial() {
        isConnected = false;
        updateSerialLed(false);
        try {
            if (reader) {
                await reader.cancel();
                reader.releaseLock();
                reader = null;
            }
            if (port) {
                await port.close();
                port = null;
            }
            addLog("> Desconectado.", "system");
            btnUpload.innerHTML = '<i class="fa-solid fa-cloud-arrow-up"></i> Upload to MCU';
        } catch (err) {
            console.error("Erro ao desconectar:", err);
        }
    }

    async function readLoop() {
        if (!port || !port.readable) return;
        
        // Usar TextDecoderStream UMA ÚNICA VEZ (fix do bug de re-pipe)
        const textDecoder = new TextDecoderStream();
        const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
        reader = textDecoder.readable.getReader();

        try {
            while (isConnected) {
                const { value, done } = await reader.read();
                if (done) {
                    addLog("> Stream de leitura encerrado.", "system");
                    break;
                }
                if (value) {
                    addLog(value);
                }
            }
        } catch (error) {
            if (error.name !== 'TypeError' && isConnected) {
                console.error("Read error:", error);
                addLog("> ⚠ Conexão perdida: " + error.message, "error");
                disconnectSerial(); // Força reset se houver erro crítico
            }
        } finally {
            try { reader.releaseLock(); } catch (e) {}
            try { await readableStreamClosed; } catch (e) {}
        }
    }

    async function writeSerial(data) {
        if (!port || !port.writable) {
            addLog("> Erro: Placa não conectada.", "error");
            return;
        }
        const encoder = new TextEncoder();
        const writer = port.writable.getWriter();
        try {
            await writer.write(encoder.encode(data));
        } finally {
            writer.releaseLock(); // Sempre libera o lock
        }
    }

    // Botão Connect no Menu Superior
    const connectMenuBtn = document.getElementById('action-connect');
    if (connectMenuBtn) {
        connectMenuBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (isConnected) {
                await disconnectSerial();
            } else {
                await connectSerial();
            }
        });
    }

    // Botão "Conectar" dentro do Modal
    btnConnect.addEventListener('click', async () => {
        btnConnect.style.display = 'none';
        loader.style.display = 'flex';
        await connectSerial();
    });

    async function uploadPythonCode() {
        if (currentCodeLang !== 'python') {
            addLog("> Mude para a aba Python para fazer o upload!", "warning");
            return;
        }
        
        let code = pyGen.workspaceToCode(workspace);
        if (!code.trim()) {
            addLog("> Nenhum bloco para enviar.", "warning");
            return;
        }

        addLog("> Enviando código para a placa...", "system");
        
        try {
            // Interromper qualquer execução anterior (Ctrl+C)
            await writeSerial('\x03');
            await new Promise(r => setTimeout(r, 100));
            await writeSerial('\x03');
            await new Promise(r => setTimeout(r, 200));

            // Entrar no modo Raw REPL (Ctrl+A)
            await writeSerial('\x01');
            await new Promise(r => setTimeout(r, 300));
            
            // Enviar o código em chunks para não sobrecarregar o buffer
            const chunkSize = 256;
            for (let i = 0; i < code.length; i += chunkSize) {
                const chunk = code.substring(i, i + chunkSize);
                await writeSerial(chunk);
                await new Promise(r => setTimeout(r, 50)); // Delay entre chunks
            }
            
            // Sair e executar (Ctrl+D)
            await writeSerial('\x04');
            await new Promise(r => setTimeout(r, 200));
            
            // Retornar ao modo normal (Ctrl+B)
            await writeSerial('\x02');
            
            addLog("> ✅ Código enviado com sucesso!", "success");
        } catch (err) {
            addLog("> Falha no envio: " + err.message, "error");
        }
    }

    // -- File Manager Logic --
    const fileModal = document.getElementById('file-modal');
    const btnOpenFiles = document.getElementById('btn-open-files');
    const btnRefreshFiles = document.getElementById('btn-refresh-files');
    const btnInstallPCA = document.getElementById('btn-install-pca');
    const fileListBody = document.getElementById('file-list-body');

    const PCA9685_LIB_CODE = `
import machine
import time

class PCA9685:
    def __init__(self, i2c, address=0x40):
        self.i2c = i2c
        self.address = address
        self.reset()
    def reset(self):
        self.i2c.writeto_mem(self.address, 0x00, b'\\x00')
    def freq(self, freq):
        prescale = int(25000000.0 / 4096.0 / freq + 0.5) - 1
        old_mode = self.i2c.readfrom_mem(self.address, 0x00, 1)[0]
        new_mode = (old_mode & 0x7F) | 0x10
        self.i2c.writeto_mem(self.address, 0x00, bytes([new_mode]))
        self.i2c.writeto_mem(self.address, 0xFE, bytes([prescale]))
        self.i2c.writeto_mem(self.address, 0x00, bytes([old_mode]))
        time.sleep_us(500)
        self.i2c.writeto_mem(self.address, 0x00, bytes([old_mode | 0xa1]))
    def pwm(self, index, on, off):
        self.i2c.writeto_mem(self.address, 0x06 + 4 * index, bytes([on & 0xFF, on >> 8, off & 0xFF, off >> 8]))
    def servo(self, index, angle):
        off = int(150 + (angle / 180.0) * 450)
        self.pwm(index, 0, off)
`;

    btnOpenFiles.addEventListener('click', () => {
        if (!isConnected) {
            alert("Conecte a placa primeiro!");
            return;
        }
        fileModal.classList.remove('hidden');
        refreshFileList();
    });

    document.getElementById('btn-close-file-modal').addEventListener('click', () => {
        fileModal.classList.add('hidden');
    });

    btnRefreshFiles.addEventListener('click', refreshFileList);

    async function refreshFileList() {
        if (!isConnected) return;
        fileListBody.innerHTML = '<tr><td colspan="2" style="text-align: center;">Lendo arquivos...</td></tr>';
        
        try {
            // Interrompe e entra no modo Raw
            await writeSerial('\x03\x01'); 
            await new Promise(r => setTimeout(r, 200));
            
            // Comando para listar arquivos
            await writeSerial("import os; print(os.listdir())\x04");
            
            // Aqui simplificamos a captura: em uma IDE real, usaríamos um buffer dedicado
            addLog("> Solicitando lista de arquivos...", "system");
            
            // Aguarda um pouco para a resposta chegar no terminal
            setTimeout(() => {
                const logs = termOutput.innerText;
                const lines = logs.split('\n');
                // Procura por algo que pareça uma lista ['a', 'b']
                let fileLine = lines.reverse().find(l => l.includes('[') && l.includes(']'));
                
                if (fileLine) {
                    try {
                        const files = JSON.parse(fileLine.replace(/'/g, '"'));
                        renderFileList(files);
                    } catch (e) {
                        fileListBody.innerHTML = '<tr><td colspan="2">Erro ao processar lista. Tente atualizar.</td></tr>';
                    }
                }
                writeSerial('\x02'); // Volta ao modo normal
            }, 1000);

        } catch (err) {
            console.error(err);
        }
    }

    function renderFileList(files) {
        fileListBody.innerHTML = '';
        if (files.length === 0) {
            fileListBody.innerHTML = '<tr><td colspan="2" style="text-align: center;">Nenhum arquivo encontrado.</td></tr>';
            return;
        }
        files.forEach(file => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><i class="fa-regular fa-file-code"></i> ${file}</td>
                <td style="text-align: center;">
                    <button class="btn-delete-file" onclick="deleteFileOnBoard('${file}')" title="Deletar">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            `;
            fileListBody.appendChild(tr);
        });
    }

    window.deleteFileOnBoard = async (filename) => {
        if (!confirm(`Tem certeza que deseja deletar "${filename}"?`)) return;
        addLog(`> Deletando ${filename}...`, "warning");
        await writeSerial('\x03\x01');
        await new Promise(r => setTimeout(r, 200));
        await writeSerial(`import os; os.remove('${filename}')\x04`);
        await new Promise(r => setTimeout(r, 500));
        await writeSerial('\x02');
        refreshFileList();
    };

    btnInstallPCA.addEventListener('click', async () => {
        addLog("> Instalando biblioteca PCA9685.py...", "system");
        btnInstallPCA.disabled = true;
        btnInstallPCA.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Instalando...';
        
        try {
            await writeSerial('\x03\x01');
            await new Promise(r => setTimeout(r, 300));
            
            const lines = PCA9685_LIB_CODE.split('\n');
            await writeSerial("f = open('pca9685.py', 'w')\n");
            
            for (let line of lines) {
                if (line.trim() === "") continue;
                // Escapa aspas para não quebrar o comando print/write
                const safeLine = line.replace(/'/g, "\\'");
                await writeSerial(`f.write('${safeLine}\\n')\n`);
                await new Promise(r => setTimeout(r, 20));
            }
            
            await writeSerial("f.close()\x04");
            await new Promise(r => setTimeout(r, 500));
            await writeSerial('\x02');
            
            addLog("> ✅ PCA9685.py instalada com sucesso!", "success");
            alert("Biblioteca PCA9685.py instalada na placa!");
            refreshFileList();
        } catch (e) {
            addLog("> Erro ao instalar biblioteca.", "error");
        } finally {
            btnInstallPCA.disabled = false;
            btnInstallPCA.innerHTML = '<i class="fa-solid fa-rocket"></i> Instalar PCA9685.py';
        }
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');

    if (savedTheme === 'light') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            workspace.setTheme(themeZelosLight);
            cmEditor.setOption('theme', 'default');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            workspace.setTheme(themeZelosDark);
            cmEditor.setOption('theme', 'material-darker');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });
});
