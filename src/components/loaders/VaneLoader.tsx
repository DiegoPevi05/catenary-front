const LoaderVane = ({className=''}) => {
  return(

    <span className={className} style={{ display: 'inline-flex', color: 'inherit' }}>

      <svg width="full" height="full" viewBox="0 0 100 29" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g>
          <path d="M1.69092 5.80433C2.7214 5.42043 5.81661 3.90187 6.68287 3.0668" stroke="currentColor" stroke-dasharray="100 100" stroke-dashoffset="100">
            <animate id="op" attributeName="stroke-dashoffset" from="100" to="0" begin="0s" dur="0.5s" fill="freeze" />
          </path>
          <path d="M6.68262 3.1473C13.5264 7.09255 29.2269 13.7753 44.8469 13.7753" stroke="currentColor" stroke-dasharray="100 100" stroke-dashoffset="100">
            <animate id="op2" attributeName="stroke-dashoffset" from="100" to="0" begin="0;+op.end" dur="0.5s" fill="freeze" />
          </path>
          <path d="M44.8474 13.7754C49.0342 13.9364 51.1276 14.0169 55.6365 13.7754" stroke="currentColor" stroke-dasharray="100 100" stroke-dashoffset="100">
            <animate id="op3" attributeName="stroke-dashoffset" from="100" to="0" begin="op2.end" dur="0.5s" fill="freeze" />
          </path>
          <path d="M93.3975 2.58371C86.5537 6.52896 71.1752 13.7753 55.5552 13.7753" stroke="currentColor" stroke-dasharray="100 100" stroke-dashoffset="100">
            <animate id="op4" attributeName="stroke-dashoffset" from="100" to="0" begin="op3.end" dur="0.5s" fill="freeze" />
          </path>

          <path d="M98.3093 5.80432C97.2788 5.41107 94.1031 3.43914 93.2369 2.58371" stroke="currentColor" stroke-dasharray="100 100" stroke-dashoffset="100">
            <animate attributeName="stroke-dashoffset" from="100" to="0" begin="op4.end" dur="0.5s" fill="freeze" />
          </path>
          <line x1="1.61035" y1="27.7681" x2="98.2288" y2="27.7681" stroke="currentColor" stroke-dasharray="98.2288 98.2288" stroke-dashoffset="98.2288">
            <animate attributeName="stroke-dashoffset" from="98.2288" to="0" begin="0" dur="2.5s" fill="freeze" />
          </line>
        </g>

        <g className="group-droppers">

          <line x1="1.27148" y1="28.2681" x2="1.27148" y2="5.72382" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681"> 
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="1.5s" dur="2s" fill="freeze" />
          </line>
          <line x1="6.26318" y1="28.2681" x2="6.26318" y2="0.731838" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="1.2s" dur="2s" fill="freeze" />
          </line>
          <line x1="12.0603" y1="28.2681" x2="12.0603" y2="5.88483" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.9s" dur="2s" fill="freeze" />
          </line>


          <line x1="22.8496" y1="28.2681" x2="22.8496" y2="9.91059" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.6s" dur="2s" fill="freeze" />
          </line>
          <line x1="33.6387" y1="28.2681" x2="33.6387" y2="12.8092" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.3s" dur="2s" fill="freeze" />
          </line>
          <line x1="44.4277" y1="28.2681" x2="44.4277" y2="13.7753" stroke="currentColor" stroke-dasharray="28.2681 28.2681" 
            stroke-dashoffset="28.2681">

            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0s" dur="2s" fill="freeze" />
          </line>
          <line x1="55.2168" y1="28.2681" x2="55.2168" y2="13.7754" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">

            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0s" dur="2s" fill="freeze" />
          </line>

          <line x1="66.0059" y1="28.2681" x2="66.0059" y2="12.8092" stroke="currentColor" stroke-dasharray="28.2681 28.2681" 
            stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.3s" dur="2s" fill="freeze" />
          </line>

          <line x1="76.7949" y1="28.2681" x2="76.7949" y2="9.91061" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.6s" dur="2s" fill="freeze" />
          </line>
          <line x1="87.584" y1="28.2681" x2="87.584" y2="5.72382" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="0.9s" dur="2s" fill="freeze" />
          </line>
          <line x1="92.8975" y1="28.2682" x2="92.8975" y2="0.731895" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="1.5s" dur="2s" fill="freeze" />
          </line>
          <line x1="97.8896" y1="28.2681" x2="97.8896" y2="5.72384" stroke="currentColor" stroke-dasharray="28.2681 28.2681" stroke-dashoffset="28.2681">
            <animate attributeName="stroke-dashoffset" from="28.2681" to="0" begin="1.2s" dur="2s" fill="freeze" />
          </line>



        </g>
      </svg>
    </span>
  )
}

export default LoaderVane;
