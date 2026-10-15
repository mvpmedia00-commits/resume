# MVP: Gold Gear Hunter (browser prototype)

Third-person steampunk action RPG. Open `index.html` in Chrome; no build step or install. It needs internet the first time to load Three.js r128 from cdnjs.

**Loop:** take a contract from Captain Brass, upgrade at Tinker Vale's, go through the teal gate, clear 3 waves, beat the boss, then come back for the reward and the next area.

- 3 areas and bosses: Runaway Foundry (Foundry Golem), Sky-Dock Nine (Drone Admiral Vex), Clockwork Vault (Clockwork Warden)
- Every enemy attack is shown on the ground first; dodge-rolling gives i-frames
- 4 upgrade lines, tonics, XP levels, 8 achievements, autosave to localStorage
- Mouse + keyboard and gamepad (Steam Input layout)

## Path to Steam (Godot 4 + GodotSteam)
The code is split to map one-to-one onto a Godot project:

| Browser prototype | Godot 4 |
|---|---|
| `ENEMY`, `BOSS`, `AREAS`, `UPGRADES` tables | `Resource` `.tres` files |
| `Platform.unlock()` | GodotSteam `Steam.setAchievement()` + `storeStats()` |
| `save` object + localStorage | `user://save.json`, synced with Steam Cloud |
| `telegraph()` ground markers | Decal + `Area3D` with a `Timer` |
| `buildTown()` / `buildDungeon()` | `town.tscn`, `dungeon_<area>.tscn` |
