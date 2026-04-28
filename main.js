document.addEventListener("DOMContentLoaded", function () {
    const blocklyDiv = document.getElementById('blocklyDiv');
    const toolbox = document.getElementById('toolbox');
    const codeOutput = document.getElementById('pythonCode');

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

    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const initialTheme = savedTheme === 'dark' ? themeZelosDark : themeZelosLight;

    const workspace = Blockly.inject(blocklyDiv, {
        toolbox: toolbox,
        scrollbars: true,
        trashcan: true,
        renderer: 'zelos',
        grid: {
            spacing: 25,
            length: 3,
            colour: '#ccc',
            snap: true
        },
        theme: initialTheme
    });

    function updateCode() {
        let code = pyGen.workspaceToCode(workspace);
        if (!code.trim()) {
            code = "# Conecte blocos abaixo do 'Quando Iniciar' para gerar código...\n";
        }
        codeOutput.textContent = code;

        if (window.Prism) {
            Prism.highlightElement(codeOutput);
        }
    }

    workspace.addChangeListener(updateCode);
    updateCode();

    const startBlock = workspace.newBlock('event_when_started');
    startBlock.initSvg();
    startBlock.render();
    startBlock.moveBy(50, 50);

    window.addEventListener('resize', function () {
        Blockly.svgResize(workspace);
    });

    document.getElementById('btn-copy').addEventListener('click', () => {
        const text = codeOutput.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const btn = document.getElementById('btn-copy');
            const originalHTML = btn.innerHTML;
            btn.classList.add('success');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
            setTimeout(() => {
                btn.classList.remove('success');
                btn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Falha ao copiar: ', err);
        });
    });

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

    // -- Save & Load XML Logic --
    document.getElementById('action-save').addEventListener('click', (e) => {
        e.preventDefault();
        const xmlDom = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        const blob = new Blob([xmlText], { type: 'text/xml' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'projeto_mcu.xml';
        a.click();
    });

    const fileInput = document.getElementById('file-upload');
    document.getElementById('action-open').addEventListener('click', (e) => {
        e.preventDefault();
        fileInput.click();
    });

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

    btnUpload.addEventListener('click', () => {
        modal.classList.remove('hidden');
        loader.style.display = 'none';
        btnConnect.style.display = 'block';
    });

    closeBtns.forEach(btn => btn.addEventListener('click', () => {
        modal.classList.add('hidden');
    }));

    btnConnect.addEventListener('click', () => {
        btnConnect.style.display = 'none';
        loader.style.display = 'flex';
        
        // Simulação de conexão WebSerial
        setTimeout(() => {
            modal.classList.add('hidden');
            addLog('> Solicitando acesso Web Serial API...', 'system');
            addLog('> [SIMULAÇÃO] Conectado com sucesso.', 'system');
            addLog('> Enviando código Python...', 'system');
            
            setTimeout(() => {
                addLog('MicroPython v1.19.1 on 2022-06-18');
                addLog('Type "help()" for more information.');
                addLog('>>> Início da execução...');
            }, 1500);
        }, 2000);
    });

    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const themeIcon = themeBtn.querySelector('i');
    const prismLink = document.getElementById('prism-theme');

    const updatePrismTheme = (theme) => {
        if (theme === 'light') {
            prismLink.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";
        } else {
            prismLink.href = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";
        }
    };

    if (savedTheme === 'light') {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        updatePrismTheme('light');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            workspace.setTheme(themeZelosLight);
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            updatePrismTheme('light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            workspace.setTheme(themeZelosDark);
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            updatePrismTheme('dark');
        }
    });
});
