import fs from 'fs';

async function fetchPokemonForList(pokemonList, filename) {
    const results = [];
    console.log(`Fetching ${pokemonList.length} Pokemon for ${filename}...`);
    
    for (const p of pokemonList) {
        let searchName = p.originalName.toLowerCase().replace(/[^a-z0-9 -]/g, '');
        
        // Handle forms
        if (searchName.includes('family of')) searchName = 'maushold-family-of-three';
        else if (searchName.includes('galarian')) searchName = searchName.replace('galarian', '').trim().replace(/\s+/g, '-') + '-galar';
        else if (searchName.includes('shield forme')) searchName = 'aegislash-shield';
        else if (searchName.includes('amped form')) searchName = 'toxtricity-amped';
        else if (searchName.includes('low key form')) searchName = 'toxtricity-low-key';
        else if (searchName.includes('dusk form')) searchName = 'lycanroc-dusk';
        else if (searchName.includes('female')) searchName = searchName.trim().replace(/\s+/g, '-');
        else if (searchName.includes('male')) searchName = searchName.trim().replace(/\s+/g, '-');
        else if (searchName.includes('alolan')) searchName = searchName.replace('alolan', '').trim().replace(/\s+/g, '-') + '-alola';
        else if (searchName.includes('wash rotom')) searchName = 'rotom-wash';
        else if (searchName.includes('heat rotom')) searchName = 'rotom-heat';
        else if (searchName.includes('mimikyu')) searchName = 'mimikyu-disguised';
        
        searchName = searchName.trim().replace(/\s+/g, '-');
        searchName = searchName.replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        if (p.formSuffix && !searchName.includes(p.formSuffix)) {
            searchName = searchName + '-' + p.formSuffix;
        }
        
        console.log(`Fetching: ${searchName} (Original: ${p.originalName})`);
        
        let imageUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
        
        for (let attempt = 1; attempt <= 2; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000);
                
                let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`, { signal: controller.signal });
                if (!res.ok) {
                    const baseName = searchName.split('-')[0];
                    res = await fetch(`https://pokeapi.co/api/v2/pokemon/${baseName}`, { signal: controller.signal });
                }
                clearTimeout(timeoutId);
                if (res.ok) {
                    const data = await res.json();
                    imageUrl = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;
                    break; // Success
                } else {
                    console.log(`  [ERROR] Could not find ${searchName}`);
                    break; // Hard error like 404, no need to retry
                }
            } catch (e) {
                console.error(`  [EXCEPTION] ${e.message} (Attempt ${attempt})`);
                if (attempt === 2) break;
                await new Promise(r => setTimeout(r, 1000)); // wait 1s before retry
            }
        }
        
        results.push({
            originalName: p.originalName,
            name: searchName,
            types: p.types,
            image: imageUrl
        });
        
        await new Promise(r => setTimeout(r, 80));
    }
    
    fs.writeFileSync(filename, JSON.stringify(results, null, 2));
    console.log(`Saved to ${filename}`);
}

async function main() {
    const text = fs.readFileSync('meta.txt', 'utf-8');
    const lines = text.split('\n');
    
    const lists = { single: [], double: [] };
    let currentMode = null;
    
    for (const line of lines) {
        if (line.includes('โหมด Single Battle')) {
            currentMode = 'single';
        } else if (line.includes('โหมด Double Battle')) {
            currentMode = 'double';
        }
        
        if (!currentMode) continue;
        
        const match = line.match(/^\s*#\d+\s*│\s*([^│]+?)\s*│\s*([^│]+?)\s*│/);
        if (match) {
            let originalName = match[1].trim();
            let typesStr = match[2].trim();
            
            let formSuffix = '';
            if (typesStr.toLowerCase().includes('hisuian')) formSuffix = 'hisui';
            else if (typesStr.toLowerCase().includes('galarian')) formSuffix = 'galar';
            else if (typesStr.toLowerCase().includes('alolan')) formSuffix = 'alola';
            
            typesStr = typesStr.replace(/\([^)]+\)/g, '').trim();
            let types = typesStr.split('/').map(t => t.trim().toLowerCase());
            
            lists[currentMode].push({ originalName, types, formSuffix });
        }
    }
    
    await fetchPokemonForList(lists.single, 'pokemon_data_single.json');
    await fetchPokemonForList(lists.double, 'pokemon_data_double.json');
}

main();
