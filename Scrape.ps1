$alphabet = @("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z")

foreach ($letter in $alphabet){
    $url = "http://tidespy.com/alphaPlaceIndex.php?Initial=$letter&cntrySel=%25"
    $fetch = Invoke-WebRequest -Uri $url
    $hrefArray +=  ($fetch).Links.href
    $titleArray += ($fetch).Links.title
    $linkArray += ($fetch).Links
}

$cleanHref = ($hrefArray)#.Where( { $_ -match '^/i' }).split('=').Where( { $_ -notmatch '^/' })
$cleanTitle = ($titleArray)#.Where( { $_ -match '^Full' })#.split('for').Where( { $_ -notmatch '^Full' }).trim() 

$cleanHref > .\outHref.txt
$cleanTitle > .\outTitle.txt
($linkArray).Where( { $_ -match '/Planner' }) > .\outLinks.txt

# ($hrefArray).Where({$_ -match '^/i'}).split('=').Where({$_ -notmatch '^/'}) >> hrefOut.txt

# (Invoke-WebRequest -Uri 'http://tidespy.com/alphaPlaceIndex.php?Initial=A&cntrySel=%25').Links.href
# (Invoke-WebRequest -Uri 'http://tidespy.com/alphaPlaceIndex.php?Initial=A&cntrySel=%25').Links.title
# $url = 'http://tidespy.com/alphaPlaceIndex.php?Initial=A&cntrySel=%25'
# ((Invoke-WebRequest -Uri $url).Links.title).Where( { $_ -match '^Full' }).split('for').Where( { $_ -notmatch '^Full' }).trim()