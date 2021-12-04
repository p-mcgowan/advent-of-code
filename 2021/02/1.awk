BEGIN {
  x = 0;
  y = 0;
}
$1 == "forward" {
  x = x + $2;
}
$1 == "up" {
  y = y - $2;
}
$1 == "down" {
  y = y + $2;
}
END {
  printf("%i*%i = %i\n", x, y, x * y);
}

