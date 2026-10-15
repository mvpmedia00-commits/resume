# MVP: Beyond the Frame (browser prototype)

Top-down open-world RPG in a fictional, after-hours Las Vegas. You play Matthew "MVP" Phillips, a photographer building MVP Media from room 12 at the Desert Rose Motel into the biggest studio in town.

Open `index.html` in Chrome. It runs from a single file with no install. Progress saves in the browser.

**Rating intent:** mature themes (nightlife, clubs, adult-film production as a business) with no explicit content. Productions cut to "That's a wrap." Every talent character is a named adult professional under a paid contract.

## What's in it
- Drivable city: traffic AI that follows lanes and turns at intersections, pedestrians who dodge, a desert road out to Red Rock Overlook, a minimap and an edge arrow pointing to your objective
- 8 story missions: club promo shoot, timed delivery, car chases (ram to stop), buying the studio, a first feature, bootleggers, and a red-carpet finale
- **Photo shoot minigame:** frame the face on a rule-of-thirds point, wait for the pose, fire in the focus window. Scored A+ to D, with a contact sheet built from real captures of your frames
- **Film production:** cast up to 2 signed performers, pick a set and crew budget, make 3 director's calls; release for opening sales plus daily royalties
- Talent roster with signing requirements, a gig board for repeatable shoots, and gear upgrades (gimbal, lens, lighting, engine)

## Controls
WASD walk/drive · F car · E interact · Space handbrake · Shift run · Esc pause · mouse + click in photo shoots

## Path to Steam
Port to Godot 4 (2D) + GodotSteam: `STORY`, `TALENT`, `GEAR` and `SETS` tables become Resources, the save object becomes `user://` + Steam Cloud, and the shoot/production screens become their own scenes. Steam allows mature content, but it must be declared accurately in the store page's Content Survey.
