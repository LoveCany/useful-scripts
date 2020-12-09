local tr = aegisub.gettext
script_name = tr("Add k tags in head")
script_description = tr("Add k tags in head to selected lines")
script_author = "LoveCany"
script_version = "1.0"

include("unicode.lua")

function add_k(subtitles, selected_lines, active_line)
	syl_i = 0
	n = 0
	for z, i in ipairs(selected_lines) do
		local l = subtitles[i]
		syl_n = unicode.len(l.text)
		l.duration = l.end_time-l.start_time
		k_value = math.floor(l.duration/10+0.5)
		if l.class == "dialogue" then
			n = n+1
		end
		text = tostring(l.text)
		if string.find(l.text,"[\\|{|}]") ~= nil then
			aegisub.debug.out("Please delete all existing tags in line "..tostring(n).."\n")
		else
			text = string.format("{\\k%d}",k_value)..text
			l.text = text
			subtitles[i] = l
		end
	end
	aegisub.set_undo_point(script_name)
end
aegisub.register_macro(script_name, tr"Add k tags in head to selected lines", add_k)
