BEGIN {
  x = 0;
  y = 0;
  a = 0;
}
$1 == "forward" {
  x = x + $2;
  y = y + $2 * a;
}
$1 == "up" {
  a = a - $2;
}
$1 == "down" {
  a = a + $2;
}
END {
  printf("%i*%i = %i\n", x, y, x * y);
}

